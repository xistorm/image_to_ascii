export const getLocalStorage = (): Storage | undefined => {
    try {
        return window.localStorage;
    } catch {
        return undefined;
    }
};

export const getLsValue = <TValue extends string = string>(
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

export const setLsValue = <TValue extends string = string>(
    key: string,
    value: TValue,
) => {
    const localStorage = getLocalStorage();
    if (!localStorage) {
        return;
    }

    localStorage.setItem(key, value);
};
