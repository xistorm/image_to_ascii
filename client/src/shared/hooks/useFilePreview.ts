import { useEffect, useMemo } from 'react';

export const useFilePreview = (file: File) => {
    const preview = useMemo(() => {
        return URL.createObjectURL(file);
    }, [file]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return preview;
};
