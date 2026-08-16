import { type FC } from 'react';

import type { IImageProps } from './Image.typings';
import { useImageLoading } from './Image.hooks';

import { LoaderWrapper } from '@/shared/components/LoaderWrapper';

export const Image: FC<IImageProps> = ({
    src,
    alt,
    ...props
}) => {
    const { isLoading, isError } = useImageLoading({ url: src });
    const isPending = isLoading || isError;

    return (
        <LoaderWrapper isLoading={isPending}>
            <img
                alt={alt}
                src={src}
                {...props}
            />
        </LoaderWrapper>
    );
};
