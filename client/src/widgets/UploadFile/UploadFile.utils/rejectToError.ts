import { ErrorCode, type FileRejection } from 'react-dropzone';
import type { ErrorOption, RegisterOptions } from 'react-hook-form';

const errorCodeToTypeMap: Partial<Record<ErrorCode | string, keyof RegisterOptions>> = {
    'file-too-small': 'min',
    'file-too-large': 'max',
};

export const rejectionsToError = (rejections: FileRejection[]): ErrorOption => {
    const errors: ErrorOption = {
        type: 'custom',
        types: {},
    };

    rejections.forEach((rejection) => {
        rejection.errors.forEach(error => {
            const type = errorCodeToTypeMap[error.code] || 'custom';
            if (!errors.types) {
                return;
            }

            errors.types[type] = error.message;
        });
    });

    return errors;
};
