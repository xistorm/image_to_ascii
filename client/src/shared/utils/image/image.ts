export const base64ToImageSrc = (
    data: string,
    type: string,
): string => {
    return `data:${type};base64,${encodeURIComponent(data)}`;
};
