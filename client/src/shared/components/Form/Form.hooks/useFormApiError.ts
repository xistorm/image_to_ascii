import { useCallback } from 'react';
import type { Control, FieldValues } from 'react-hook-form';

import type { ApiError } from '@/shared/api';

export const useFormApiError = <
    TFieldValues extends FieldValues,
    TContext,
    TTransformedValued = TFieldValues,
>(
    control: Control<TFieldValues, TContext, TTransformedValued>,
) => {
    const { setError } = control;

    return useCallback((error: ApiError) => {
        const message = error.response?.data.message;
        if (!message) {
            return;
        }

        setError('form', { message });
    }, [setError]);
};
