import './input-with-select.style.css';

const InputWithSelect = ({ children, ...props }) => {
    return (
        <div className="input-with-select" {...props}>
            {...children}
        </div>
    );
};

export default InputWithSelect;
