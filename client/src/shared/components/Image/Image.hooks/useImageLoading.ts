import { useCallback, useEffect, useState } from 'react';
import { noop } from '@/shared/utils';

export interface UseImageLoadingParams {
    url?: string;
    onLoaded?: VoidFunction;
    onError?: VoidFunction;
}

export const useImageLoading = ({
    url,
    onLoaded = noop,
    onError = noop,
}: UseImageLoadingParams) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setIsError(false);
        onLoaded();
    }, [onLoaded]);

    const handleError = useCallback(() => {
        setIsLoading(false);
        setIsError(true);
        onError();
    }, [onError]);

    useEffect(() => {
        if (!url) {
            return setIsError(true);
        }

        const image = new Image();
        image.src = url;

        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);

        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
            image.src = '';
        };
    }, [url, handleLoad, handleError]);

    return {
        isLoading,
        isError,
    };
};
