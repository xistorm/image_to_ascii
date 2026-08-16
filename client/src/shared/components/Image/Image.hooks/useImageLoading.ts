import { useEffect, useState } from 'react';
import { noop } from '@/shared/utils';

export type ImageHandler = (_image: HTMLImageElement) => void;

export interface UseImageLoadingParams {
    url?: string;
    onLoaded?: ImageHandler;
    onError?: ImageHandler;
}

export const useImageLoading = ({
    url,
    onLoaded = noop,
    onError = noop,
}: UseImageLoadingParams) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (!url) {
            return setIsError(true);
        }

        const image = new Image();
        image.src = url;

        const handleLoad = () => {
            setIsLoading(false);
            setIsError(false);
            onLoaded(image);
        };

        const handleError = () => {
            setIsLoading(false);
            setIsError(true);
            onError(image);
        };

        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);

        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
            image.src = '';
        };
    }, [url, onLoaded, onError]);

    return {
        isLoading,
        isError,
    };
};
