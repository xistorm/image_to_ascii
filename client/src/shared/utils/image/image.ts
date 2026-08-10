export const buildBase64Src = (
    data: string,
    type: string,
): string => {
    return `data:${type};base64,${encodeURIComponent(data)}`;
};
