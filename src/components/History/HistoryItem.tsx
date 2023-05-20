import { useCallback } from 'react';
import { useStore } from '../../providers/Store.provider';

export type HistoryItemProps = {
    infix: string;
    result: number;
    timestamp: number; // epoch
};

const HistoryItem = ({ infix, result, timestamp }: HistoryItemProps) => {
    const { setDisplay } = useStore();

    return (
        <div className="history-item">
            <div className="infix" onClick={() => setDisplay(infix)}>
                {infix}
            </div>
            <div className="result" onClick={() => setDisplay(result.toString())}>
                {result}
            </div>
            {/*<div className="timestamp">{timestamp}</div>*/}
        </div>
    );
};

export default HistoryItem;
