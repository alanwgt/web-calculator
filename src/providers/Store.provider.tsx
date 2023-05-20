import { Context, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { addOpToString, debug, isKnownCharacter } from '../lib/helpers';
import { evaluate } from '../lib/interpreter';
import { HistoryItemProps } from '../components/History/HistoryItem';
import { useEffect } from 'preact/compat';
import { execIfHasStorage, load, save } from '../lib/browserstore';

type Mode = 'normal' | 'compound_interest';

type StoreContextProps = {
    clearHistory: () => void;
    undo: () => void;
    redo: () => void;
    display: string;
    setDisplay: (display: string) => void;
    handleToken: (operator: unknown) => void;
    history: HistoryItemProps[];
    canUndo: boolean;
    canRedo: boolean;
    error: string | null;
    mode: Mode;
    setMode: (mode: Mode) => void;
};

export const StoreContext: Context<StoreContextProps> = createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearHistory: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    undo: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    redo: () => {},
    display: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    setDisplay: (display: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    handleToken: (operator: unknown) => {},
    history: [],
    canUndo: false,
    canRedo: false,
    error: null,
    mode: 'normal',
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    setMode: (mode: Mode) => {},
});

export const StoreProvider = ({ children }) => {
    const [display, setDisplay] = useState('');
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState<Mode>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        if (mode !== null) {
            return mode as Mode;
        }

        const m = execIfHasStorage((store) => store.getItem('mode'));
        if (m !== null) {
            return m as Mode;
        }

        return 'normal';
    });

    useEffect(() => {
        execIfHasStorage((store) => store.setItem('mode', mode));
    }, [mode]);

    useEffect(() => {
        const lastState = load();
        if (!lastState) {
            return;
        }

        setDisplay(lastState.display);
        setHistory(lastState.history);
        setRedoStack(lastState.redoStack);
        setError(lastState.error);
    }, []);

    useEffect(() => {
        const state = {
            display,
            history,
            redoStack,
            error,
        };

        save(state);
    }, [display, history, redoStack, error]);

    const addHistory = (item: HistoryItemProps) => {
        setHistory([...history, item]);
    };

    const clearHistory = () => {
        setError(null);
        setRedoStack([]);
        setHistory([]);
    };

    const undo = () => {
        if (!history.length) {
            return;
        }

        const lastHistoryItem = history[history.length - 1];
        setRedoStack([...redoStack, lastHistoryItem]);
        setDisplay(lastHistoryItem.infix);
        setHistory(history.slice(0, -1));
    };

    const redo = () => {
        if (!redoStack.length) {
            return;
        }

        const lastRedoItem = redoStack[redoStack.length - 1];
        setHistory([...history, lastRedoItem]);
        setDisplay(lastRedoItem.infix);
        setRedoStack(redoStack.slice(0, -1));
    };

    const handleToken = (token) => {
        if (!isKnownCharacter(token)) {
            debug('Unknown character', token);
            return;
        }
        debug('handling token', token);

        if (token === '←') {
            if (display.length > 0) {
                setDisplay((display) => display.slice(0, -1));
            }

            return;
        }

        if (token === '.') {
            if (display.length === 0) {
                setDisplay('0.');
                return;
            }

            if (display[display.length - 1] === '.') {
                return;
            }

            setDisplay((display) => display + '.');
            return;
        }

        if (token === 'C') {
            setDisplay('');
            return;
        }

        if (token === '=') {
            let result;
            try {
                result = evaluate(display);
            } catch (e) {
                setError(e.message);
                return;
            }

            if (result === Infinity) {
                setDisplay('∞');
                return;
            }

            if (result === -Infinity) {
                setDisplay('-∞');
                return;
            }

            if (isNaN(result)) {
                setError('NaN');
                return;
            }

            const resultStr = result.toString();
            if (resultStr.trim().length === 0 || resultStr === display) {
                return;
            }

            setError(null);
            addHistory({
                infix: display,
                result,
                timestamp: new Date().getTime(),
            });
            setDisplay(String(result));
            setRedoStack([]);
            return;
        }

        setError(null);
        setDisplay((display) => addOpToString(token, display));
    };

    const value = {
        clearHistory,
        undo,
        redo,
        display,
        history,
        handleToken,
        setDisplay,
        canUndo: history.length > 0,
        canRedo: redoStack.length > 0,
        error,
        mode,
        setMode,
    };

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
