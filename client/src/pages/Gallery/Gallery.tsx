import type { FC } from 'react';
import { useLoaderData } from '@tanstack/react-router';

import styles from './Gallery.module.css';

import { UploadPreview } from '@/widgets/UploadPreview';
import { Link } from '@/shared/components/Link';
import { Button } from '@/shared/components/Button';
import { Gallery as GalleryBase } from '@/shared/components/Gallery';
import { cn } from '@/shared/utils';

const cnGallery = cn(styles);

export const Gallery: FC = () => {
    const uploads = useLoaderData({ from: '/_logged/gallery' });

    return (
        <div className={cnGallery('Gallery')}>
            <div className={cnGallery('Gallery-Header')}>
                <div className={cnGallery('Gallery-Info')}>
                    <span className={cnGallery('Gallery-Title')}>Моя галерея</span>
                    <span className={cnGallery('Gallery-Description')}>ASCII-арт, который вы уже сгенерировали</span>
                </div>
                <Link view="secondary" to="/create">
                    <Button text="Загрузить новое фото"/>
                </Link>
            </div>

            <GalleryBase>
                {uploads.map(upload => (
                    <UploadPreview
                        key={upload.id}
                        id={upload.id}
                        status={upload.status}
                        title={upload.name}
                        previewUrl={upload.url}
                        description={upload.date.toLocaleString()}
                    />
                ))}
            </GalleryBase>
        </div>
    );
};
