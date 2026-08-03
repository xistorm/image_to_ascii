import type { Accept } from 'react-dropzone';

const normalizeAccept = (accept: Accept) => {
    const startsWith: string[] = [];
    const equals: string[] = [];

    Object.entries(accept).forEach(([key, value]) => {
        const emptyValue = !value || !value.length;
        const [type, extension] = key.split('/');

        if (extension === '*') {
            return startsWith.push(`${type}/`);
        }

        if (emptyValue) {
            return equals.push(key);
        }

        const values = typeof value === 'string' ? [value] : value;
        values.forEach(value => {
            const mimeType = [type, value].join('/');
            equals.push(mimeType);
        });
    });

    return {
        startsWith,
        equals,
    };
};

export const validateFileType = (file: File, accept?: Accept) => {
    if (!accept) {
        return true;
    }

    const normalizedAccept = normalizeAccept(accept);
    if (normalizedAccept.startsWith.some(type => file.type.startsWith(type))) {
        return true;
    }

    if (normalizedAccept.equals.some(type => file.type === type)) {
        return true;
    }

    return false;
};
