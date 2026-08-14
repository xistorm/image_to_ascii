import { useEffect, useState } from 'react';

export interface ImageSize {
    width: number;
    height: number;
}

export const useImageSize = (url: string) => {
    const [size, setSize] = useState<ImageSize | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const image = new Image();
        image.src = url;

        const handleLoad = () => {
            const size: ImageSize = {
                width: image.naturalWidth,
                height: image.naturalHeight,
            };

            setLoading(false);
            setError(false);
            setSize(size);
        };

        const handleError = () => {
            setLoading(false);
            setError(true);
        };

        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);

        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
            image.src = '';
        };
    }, [url]);

    return {
        size,
        loading,
        error,
    };
};
