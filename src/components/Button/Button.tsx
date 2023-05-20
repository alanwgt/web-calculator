import './button.style.css';
import type { ComponentChildren } from 'preact';
import classNames from '../../lib/classnames';

type ButtonProps = {
    children: ComponentChildren;
    variant?:
        | 'filled'
        | 'outlined'
        | 'text'
        | 'filled-tonal'
        | 'error'
        | 'filled-secondary'
        | 'filled-tertiary'
        | 'icon';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

const Button = ({
    children,
    variant,
    className = '',
    disabled = false,
    ...props
}: ButtonProps) => (
    <button
        className={classNames({
            button: true,
            [variant]: true,
            [className]: true,
            disabled,
        })}
        {...props}
    >
        {children}
    </button>
);

export default Button;
