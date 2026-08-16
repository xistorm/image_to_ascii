import { useCallback, useState } from 'react';
import { useImageLoading } from '@/shared/components/Image/Image.hooks/useImageLoading';

export interface ImageSize {
    width: number;
    height: number;
}

export const useImageSize = (url: string) => {
    const [size, setSize] = useState<ImageSize | undefined>(undefined);

    const onLoaded = useCallback((image: HTMLImageElement) => {
        setSize({
            width: image.naturalWidth,
            height: image.naturalHeight,
        });
    }, []);

    const { isLoading, isError } = useImageLoading({ url, onLoaded });

    return {
        size,
        isLoading,
        isError,
    };
};
