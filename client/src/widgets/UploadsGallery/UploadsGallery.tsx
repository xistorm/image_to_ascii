import type { FC } from 'react';

import type { IUploadsGalleryProps } from './UploadsGallery.typings';

import { UploadPreview } from '@/features/UploadPreview';
import { Gallery } from '@/shared/components/Gallery';

export const UploadsGallery: FC<IUploadsGalleryProps> = ({
    items,
}) => {
    return (
        <Gallery>
            {items.map(item => (
                <UploadPreview key={item.id} {...item} />
            ))}
        </Gallery>
    );
};
