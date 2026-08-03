import { compact } from '@/shared/utils';
import type { IUploadFileProps } from '@/widgets';
import { filesize } from 'filesize';
import type { Accept } from 'react-dropzone';

const getAcceptRestrictions = (accept: Accept) => {
    return Object
        .entries(accept)
        .map(([key, value]) => {
            if (!value || !value.length) {
                return key;
            }

            if (typeof value === 'string') {
                return value;
            }

            if (Array.isArray(value)) {
                return value.join(', ');
            }
        })
        .filter(Boolean)
        .join(', ');
};

const getSizeRestrictions = (size: number) => {
    return filesize(size, { standard: 'si' });
};

export const getRestrictions = ({
    accept,
    maxSize,
}: IUploadFileProps) => {
    return compact([
        accept && {
            id: 'accept',
            name: 'Поддерживаемые форматы',
            value: getAcceptRestrictions(accept),
        },
        maxSize && {
            id: 'max',
            name: 'Максимальный размер файла',
            value: getSizeRestrictions(maxSize),
        },
    ]);
};
