import { isGrouping, isNumber, isOperator, Operator } from './interpreter';

export function isKnownCharacter(value: string): value is string {
    return (
        isOperator(value) ||
        isNumber(value) ||
        isGrouping(value) ||
        value === 'C' ||
        value === '=' ||
        value === '←' ||
        value === '.'
    );
}

export function addOpToString(op: string, str: string): string {
    if (str.length === 0) return op;

    if (isOperator(str[str.length - 1]) && isOperator(op))
        return str.slice(0, -1) + op;

    return str + op;
}

export function prettyPrintInfix(infix: string[]): string {
    return infix.join(' ');
}

export function prettyPrintAST(ast): string {
    if (!ast) return '';

    return (
        '(' +
        prettyPrintAST(ast.left) +
        ' ' +
        ast.value +
        ' ' +
        prettyPrintAST(ast.right) +
        ')'
    );
}

export function debug(...args: unknown[]): void {
    if (process.env.NODE_ENV === 'production') return;

    console.log(
        'DEBUG:' +
            new Date().toLocaleTimeString('en-US', { hour12: false }) +
            ':',
        ...args
    );
}
