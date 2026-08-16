import { useCallback, useEffect, useState } from 'react';

import { noop, type VoidFunction } from '@/shared/utils';

export interface UserFilePreviewParams {
    file: File;
    onSuccess?: VoidFunction;
    onError?: VoidFunction;
}

export const useFilePreview = ({
    file,
    onSuccess = noop,
    onError = noop,
}: UserFilePreviewParams) => {
    const getObjectUrlSafe = useCallback((file: File) => {
        try {
            const preview = URL.createObjectURL(file);
            onSuccess();
            return preview;
        } catch {
            onError();
            return undefined;
        }
    }, [onSuccess, onError]);

    const initialPreview = getObjectUrlSafe(file);
    const [preview, setPreview] = useState<string | undefined>(initialPreview);

    useEffect(() => {
        const newPreview = getObjectUrlSafe(file);
        setPreview(newPreview);

        return () => {
            if (newPreview) {
                URL.revokeObjectURL(newPreview);
            }
        };
    }, [file, getObjectUrlSafe]);

    return preview;
};
