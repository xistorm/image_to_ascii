import { type HTMLInputTypeAttribute, useCallback, useState } from 'react';

export const usePasswordInput = (type: HTMLInputTypeAttribute) => {
    const isPassword = type === 'password';
    const [calculatedType, setCalculatedType] = useState<HTMLInputTypeAttribute>(type);

    const togglePasswordVisibility = useCallback(() => {
        if (!isPassword) {
            return;
        }

        setCalculatedType(prevType => prevType === 'password' ? 'text' : 'password');
    }, []);

    return {
        isPassword,
        calculatedType,
        togglePasswordVisibility,
    };
};
