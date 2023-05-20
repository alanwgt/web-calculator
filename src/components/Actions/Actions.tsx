import { useStore } from '../../providers/Store.provider';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Delete from '../Icon/Delete';
import Container from '../Container/Container';
import Undo from '../Icon/Undo';
import Redo from '../Icon/Redo';
import { useCallback, useEffect, useMemo } from 'react';
import { debug } from '../../lib/helpers';
import LightMode from '../Icon/LightMode';
import DarkMode from '../Icon/DarkMode';
import { useState } from 'preact/hooks';

import './actions.style.css';
import Bank from '../Icon/Bank';
import Calculator from '../Icon/Calculator';

const Actions = () => {
    const { clearHistory, undo, redo, canUndo, canRedo, mode, setMode } =
        useStore();
    const bodyEl = useMemo(() => document.querySelector('body'), []);
    const [theme, setTheme] = useState(bodyEl.dataset.theme);
    const toggleTheme = useCallback(() => {
        if (bodyEl.dataset.theme === 'dark') {
            bodyEl.dataset.theme = 'light';
        } else {
            bodyEl.dataset.theme = 'dark';
        }

        setTheme(bodyEl.dataset.theme);
    }, [bodyEl]);

    const toggleMode = useCallback(() => {
        if (mode === 'normal') {
            setMode('compound_interest');
        } else {
            setMode('normal');
        }
    }, [mode, setMode]);

    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            debug('setting dark theme, because user prefers dark theme');
            bodyEl.dataset.theme = 'dark';
            setTheme('dark');
        } else {
            bodyEl.dataset.theme = 'light';
            setTheme('light');
        }
    }, []);

    return (
        <Container variant="tertiary" className="actions">
            <Button variant="icon" onClick={clearHistory}>
                <Icon>
                    <Delete />
                </Icon>
            </Button>
            <Button variant="icon" onClick={undo} disabled={!canUndo}>
                <Icon>
                    <Undo />
                </Icon>
            </Button>
            <Button variant="icon" onClick={redo} disabled={!canRedo}>
                <Icon>
                    <Redo />
                </Icon>
            </Button>
            <Button variant="icon" onClick={toggleTheme}>
                <Icon>{theme === 'dark' ? <LightMode /> : <DarkMode />}</Icon>
            </Button>
            <Button variant="icon" onClick={toggleMode}>
                <Icon>{mode === 'normal' ? <Bank /> : <Calculator />}</Icon>
            </Button>
        </Container>
    );
};

export default Actions;
