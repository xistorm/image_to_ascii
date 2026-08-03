import { UploadPreview } from '@/features';
import { Gallery } from '@/shared/ui/components';
import type { FC } from 'react';
import type { IUploadsGalleryProps } from './UploadsGallery.typings';

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
