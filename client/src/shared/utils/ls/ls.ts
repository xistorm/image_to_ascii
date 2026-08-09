const getLocalStorage = (): Storage | undefined => {
    try {
        return window.localStorage;
    } catch {
        return undefined;
    }
};

const getLsValue = <TValue extends string = string>(
    key: string,
    defaultValue: TValue,
): TValue => {
    const localStorage = getLocalStorage();
    if (!localStorage) {
        return defaultValue;
    }

    const value = localStorage.getItem(key) || defaultValue;

    return value as TValue;
};

const setLsValue = <TValue extends string = string>(
    key: string,
    value: TValue,
) => {
    const localStorage = getLocalStorage();
    if (!localStorage) {
        return;
    }

    localStorage.setItem(key, value);
};

const removeLsValue = (key: string) => {
    const localStorage = getLocalStorage();
    if (!localStorage) {
        return;
    }

    localStorage.removeItem(key);
};

export const createLsStorage = <TValue extends string>(
    key: string,
    defaultValue: TValue,
) => {
    return {
        get: () => getLsValue(key, defaultValue),
        set: (value: TValue) => setLsValue(key, value),
        clear: () => removeLsValue(key),
    };
};
