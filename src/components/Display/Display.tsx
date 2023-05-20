import './display.style.css';
import { useStore } from '../../providers/Store.provider';
import Surface from '../Surface/Surface';

const Display = () => {
    const { display, error } = useStore();

    return (
        <Surface className="display" variant>
            <span className="infix">{display}</span>
            {error && <span className="error">{error}</span>}
        </Surface>
    );
};

export default Display;
