import { AxiosError } from 'axios';

export const getUnknownErrorMessage = (error: unknown): string | undefined => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    }

    return undefined;
};

export const getApiErrorMessage = (error: unknown): string => {
    const fallbackErrorMessage = 'Что-то пошло не так...';

    if (error instanceof AxiosError) {
        return error.response?.data.message || fallbackErrorMessage;
    }

    return fallbackErrorMessage;
};
