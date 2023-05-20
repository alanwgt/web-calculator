import { useStore } from '../../providers/Store.provider';
import Container from '../Container/Container';
import HistoryItem from './HistoryItem';
import Actions from '../Actions/Actions';

import './history.style.css';

const History = () => {
    const { history } = useStore();

    return (
        <div className="history-container">
            <Actions />
            <Container variant="secondary" className="history">
                {history.map((h) => (
                    <HistoryItem
                        key={h.timestamp}
                        infix={h.infix}
                        result={h.result}
                        timestamp={h.timestamp}
                    />
                ))}
            </Container>
        </div>
    );
};

export default History;
