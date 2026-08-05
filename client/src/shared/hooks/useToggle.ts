import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
    const [isOpened, setIsOpened] = useState<boolean>(defaultValue);

    const open = useCallback(() => {
        setIsOpened(true);
    }, []);

    const close = useCallback(() => {
        setIsOpened(false);
    }, []);

    const toggleIsOpened = useCallback(() => {
        setIsOpened(current => !current);
    }, []);

    return {
        isOpened,
        open,
        close,
        toggleIsOpened,
    };
};
