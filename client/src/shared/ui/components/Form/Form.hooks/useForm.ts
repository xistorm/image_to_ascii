import { type ChangeEventHandler, useCallback, useState } from 'react';

export const useForm = <TFormState extends Record<string, string>>() => {
    const [formState, setFormState] = useState<TFormState | undefined>(undefined);

    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
        const { name, value } = event.currentTarget;

        setFormState(currentState => ({
            ...currentState,
            [name]: value,
        } as TFormState));
    }, []);

    return {
        formState,
        onChange,
    };
};
