import type { UploadGeneration, UploadParams } from '@/entities/upload';

import type { ImageSize } from '@/shared/components/Image/Image.hooks';

export interface IAsciiImageProps {
    className?: string;
    alt: string;
    size?: ImageSize;
    frames: UploadGeneration[];
    params: UploadParams;
}
