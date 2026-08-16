import { type FC } from 'react';

import type { IAsciiImageProps } from './AsciiImage.typings';
import { useAsciiImage } from '@/features/AsciiImage/AsciiImage.hooks';
import { Image } from '@/shared/components/Image';

export const AsciiImage: FC<IAsciiImageProps> = ({
    className,
    alt,
    ...props
}) => {
    const asciiImage = useAsciiImage(props);

    return (
        <Image
            className={className}
            alt={alt}
            src={asciiImage}
        />
    );
};
