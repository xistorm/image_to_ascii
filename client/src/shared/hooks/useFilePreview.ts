import { useEffect, useState } from 'react';

export const useFilePreview = (file: File) => {
    const [preview, setPreview] = useState<string | undefined>();

    useEffect(() => {
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);

        return () => {
            URL.revokeObjectURL(filePreview);
            setPreview(undefined);
        };
    }, [file]);

    return preview;
};
