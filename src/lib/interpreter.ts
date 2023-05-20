import { debug, prettyPrintAST } from './helpers';

export type Operator = '+' | '-' | '*' | '/' | '(' | ')' | 'C' | '^' | ' ';

export const T_OPENING_PARENTHESIS: Operator = '(';
export const T_CLOSING_PARENTHESIS: Operator = ')';
export const T_OP_SUM: Operator = '+';
export const T_OP_SUB: Operator = '-';
export const T_OP_MUL: Operator = '*';
export const T_OP_DIV: Operator = '/';
export const T_OP_POW: Operator = '^';
export const T_SPACE: Operator = ' ';

class ASTNode {
    public value: number | Operator;
    public left: ASTNode;
    public right: ASTNode;

    constructor(
        value: number | Operator,
        left: ASTNode = null,
        right: ASTNode = null
    ) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function precedence(operator: string): number {
    switch (operator) {
        case T_OP_SUM:
        case T_OP_SUB:
            return 1;
        case T_OP_MUL:
        case T_OP_DIV:
            return 2;
        default:
            return 0;
    }
}

function shuntingYard(infix: string[]) {
    const ops = []; // stack for operators and parentheses
    const ast = []; // stack for the Abstract Syntax Tree

    for (const token of infix) {
        if (isOperator(token)) {
            while (ops.length && precedence(token) <= precedence(ops[ops.length - 1])) {
                const op = ops.pop();
                const r = ast.pop();
                const l = ast.pop();
                ast.push(new ASTNode(op, l, r));
            }

            ops.push(token);
        } else if (token === T_OPENING_PARENTHESIS) {
            ops.push(token);
        } else if (token === T_CLOSING_PARENTHESIS) {
            while (ops.length && ops[ops.length - 1] !== T_OPENING_PARENTHESIS) {
                const op = ops.pop();
                const r = ast.pop();
                const l = ast.pop();
                ast.push(new ASTNode(op, l, r));
            }

            if (ops.length === 0 || ops.pop() !== T_OPENING_PARENTHESIS) {
                throw new Error('Mismatched parentheses');
            }
        } else if (token === T_SPACE) {
            break;
        } else { // must be a number
            debug('parsing token that should be a number', token);
            ast.push(new ASTNode(parseFloat(token)))
        }
    }
    while (ops.length > 0) {
        const op = ops.pop();
        if (op === T_OPENING_PARENTHESIS) {
            throw new Error('Mismatched parentheses');
        }

        const r = ast.pop();
        const l = ast.pop();
        ast.push(new ASTNode(op, l, r));
    }

    return ast.pop(); // AST is at the top of the stack
}

function interpret(ast: ASTNode): number {
    if (ast === null) {
        throw new Error('AST is null');
    }

    switch (ast.value) {
        case T_OP_SUM:
            return interpret(ast.left) + interpret(ast.right);
        case T_OP_SUB:
            return interpret(ast.left) - interpret(ast.right);
        case T_OP_MUL:
            return interpret(ast.left) * interpret(ast.right);
        case T_OP_DIV:
            if (interpret(ast.right) === 0) {
                throw new Error('Division by zero');
            }
            return interpret(ast.left) / interpret(ast.right);
        case T_OPENING_PARENTHESIS:
            return interpret(ast.left);
        case T_CLOSING_PARENTHESIS:
            return interpret(ast.right);
        default:
            return ast.value;
    }
}

export function tokenize(infix: string): string[] {
    const tokens: string[] = [];
    let number = '';
    let hasDot = false;
    for (const char of infix) {
        if (char.match(/[0-9]/)) {
            number += char;
        } else if (char === '.') {
            if (hasDot) {
                throw new Error('Invalid number format: More than one dot');
            }
            number += char;
            hasDot = true;
        } else {
            if (number !== '') {
                tokens.push(number);
                number = '';
                hasDot = false; // Reset the dot flag for the next number
            }
            if (char.trim() !== '') {
                tokens.push(char);
            }
        }
    }
    if (number !== '') {
        tokens.push(number);
    }
    return tokens;
}

export function evaluate(infix: string): number {
    const ast = shuntingYard(tokenize(infix));
    debug('AST Tree', prettyPrintAST(ast));
    return interpret(ast);
}

export function isGrouping(value: string): value is Operator {
    return value === T_OPENING_PARENTHESIS || value === T_CLOSING_PARENTHESIS;
}

export function isOperator(token: string): token is Operator {
    return [T_OP_SUM, T_OP_SUB, T_OP_MUL, T_OP_DIV].includes(token);
}

export function isNumber(value: unknown): value is number {
    const number = Number(value);
    return !isNaN(number) && isFinite(number);
}
