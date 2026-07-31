export const getCatchedErrorMessage = (error: unknown): string | undefined => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    }

    return undefined;
};
