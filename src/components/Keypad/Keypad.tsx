import './keypad.style.css';
import { useEffect } from 'preact/compat';
import { debug, isKnownCharacter } from '../../lib/helpers';
import KeypadButton from './KeypadButton';
import { useCallback } from 'react';
import { useStore } from '../../providers/Store.provider';
import Backspace from '../Icon/Backspace';
import Icon from '../Icon/Icon';
import Add from '../Icon/Add';
import Close from '../Icon/Close';
import Remove from '../Icon/Remove';
import Equal from '../Icon/Equal';

const Keypad = () => {
    const { handleToken, clearHistory, undo, redo } = useStore();
    const handleKeyDown = useCallback(
        (e) => {
            let { key } = e;

            if (e.ctrlKey) {
                if (key === 'Delete') {
                    e.preventDefault();
                    clearHistory();
                } else if (key === 'z') {
                    e.preventDefault();
                    undo();
                } else if (key === 'y') {
                    e.preventDefault();
                    redo();
                }

                return;
            }

            if (key === 'Enter') {
                key = '=';
            } else if (key === 'Backspace') {
                key = '←';
            } else if (key === 'Escape' || key === 'Delete') {
                key = 'C';
            }

            if (!isKnownCharacter(key)) {
                debug('Unknown character', key);
                return;
            }

            handleToken(key);
        },
        [handleToken]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className='keypad-container'>
            <div className="keypad">
                <KeypadButton operator="7" />
                <KeypadButton operator="8" />
                <KeypadButton operator="9" />
                <KeypadButton operator="/" icon="/" />
                <KeypadButton operator="C" icon="AC" />
                <KeypadButton operator="4" />
                <KeypadButton operator="5" />
                <KeypadButton operator="6" />
                <KeypadButton
                    operator="*"
                    icon={
                        <Icon>
                            <Close />
                        </Icon>
                    }
                />
                <KeypadButton operator="(" />
                <KeypadButton operator="1" />
                <KeypadButton operator="2" />
                <KeypadButton operator="3" />
                <KeypadButton
                    operator="-"
                    icon={
                        <Icon>
                            <Remove />
                        </Icon>
                    }
                />
                <KeypadButton operator=")" />

                <KeypadButton operator="0" />
                <KeypadButton operator="." />
                <KeypadButton
                    operator="←"
                    icon={
                        <Icon>
                            <Backspace />
                        </Icon>
                    }
                />
                <KeypadButton
                    operator="+"
                    icon={
                        <Icon>
                            <Add />
                        </Icon>
                    }
                />
                <KeypadButton
                    operator="="
                    icon={
                        <Icon>
                            <Equal />
                        </Icon>
                    }
                />
            </div>
        </div>
    );
};

export default Keypad;
