import './select.style.css';
import { useCallback } from 'preact/compat';

const Select = ({ id, label, options, value, onChange }) => {
    const handleChange = useCallback(
        (e) => {
            const { value, id } = e.target;
            onChange({ value, id });
        },
        [onChange]
    );

    return (
        <div className="select">
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
