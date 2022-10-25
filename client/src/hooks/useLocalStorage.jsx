import { useState, useEffect } from 'react';

const PREFIX = 'chat-me-';

export function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const jsonValue = localStorage.getItem(prefixedKey);

    const [value, setValue] = useState(() => {
        if (jsonValue != null) return JSON.parse(jsonValue);
        else {
            if (typeof(initialValue) === 'function') return initialValue();
            else return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
