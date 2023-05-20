import Display from '../Display/Display';
import Keypad from '../Keypad';

const Calculator = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Display />
        <Keypad />
    </div>
)

export default Calculator;
