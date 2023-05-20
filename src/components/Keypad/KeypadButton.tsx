import Button from '../Button';
import { useStore } from '../../providers/Store.provider';
import { isGrouping, isOperator as isOp } from '../../lib/interpreter';
import { useMemo } from 'preact/compat';

const KeypadButton = ({ operator, icon = null }) => {
    const { handleToken } = useStore();

    const isOperator = useMemo(
        () => isOp(operator) || isGrouping(operator) || operator === '←',
        [operator]
    );

    const variant = useMemo(() => {
        if (operator === 'C') {
            return 'error';
        } else if (isOperator) {
            return 'filled-tonal';
        } else if (operator === '=') {
            return 'filled-tertiary';
        } else {
            return 'filled';
        }
    }, [operator]);

    return (
        <Button
            className='keypad-button'
            variant={variant}
            onClick={() => handleToken(operator)}
        >
            {icon ?? operator}
        </Button>
    );
};

export default KeypadButton;
