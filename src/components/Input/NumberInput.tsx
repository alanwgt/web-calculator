import './number-input.style.css';
import { JSXInternal } from 'preact/src/jsx';
import { useCallback } from 'react';

type NumberInputProps = JSXInternal.HTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    value?: number | string;
    onChange?: (e: unknown) => void;
};

const NumberInput = ({
    label,
    id,
    value,
    onChange,
    placeholder,
    ...props
}: NumberInputProps) => {
    const handleChange = useCallback(
        (e) => {
            const { value, id } = e.target;
            onChange({ value, id });
        },
        [onChange]
    );

    return (
        <div className="control" {...props}>
            <label className="label" htmlFor={label}>
                {label}
            </label>
            <input
                className="input"
                type="number"
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default NumberInput;
