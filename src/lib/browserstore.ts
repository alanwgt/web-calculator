import { HistoryItemProps } from '../components/History/HistoryItem';

const browserStoreKey = 'calculator';
const hasBrowserStorage = typeof window.localStorage !== 'undefined';

type StorageData = {
    display: string,
    history: HistoryItemProps[],
    redoStack: string[],
    error: string | null,
}

export function getBrowserStorage(): Storage {
    if (!hasBrowserStorage) throw new Error('Browser does not support Storage');

    return window.localStorage;
}

export function execIfHasStorage(fn: (store: Storage) => unknown, def: unknown = null): unknown {
    if (!hasBrowserStorage) {
        return def;
    }

    return fn(getBrowserStorage());
}

export function load(): StorageData | null {
    return execIfHasStorage(store => JSON.parse(store.getItem(browserStoreKey))) as StorageData;
}

export function save(state: StorageData): void {
    execIfHasStorage(store => store.setItem(browserStoreKey, JSON.stringify(state)));
}
