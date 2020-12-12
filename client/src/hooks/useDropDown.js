import {useMemo, useState} from 'react';

export default function useDropDown(multiSelect = false, defaultValue = {}, isLocalStorage) {
    const [selection, setSelection] = useState([]);
    const [value, setValue] = useState(defaultValue);

    const onCLickHandler = item => {
        setValue(item);
        if (isLocalStorage) {
            localStorage.setItem('lang', JSON.stringify(item))
        }
        if (!selection.some(current => current === item)) {
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(current => current !== item);
            setSelection([...selectionAfterRemoval]);
        }
    };

    function isItemInSelection(item) {
        if (selection.find(current => current === item)) {
            return true;
        }
        return false;
    }
    const memoizedValue = useMemo(() => {
        return value;
    },[value])

    return {
        onCLickHandler,
        selection,
        value:memoizedValue,
        isItemInSelection,
    };
}