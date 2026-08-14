import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import styles from './Gallery.module.css';

import { UploadPreview } from '@/widgets/UploadPreview';
import { getUploadsQueryOptions } from '@/entities/upload';
import { Link } from '@/shared/components/Link';
import { Button } from '@/shared/components/Button';
import { Gallery as GalleryBase } from '@/shared/components/Gallery';
import { cn } from '@/shared/utils';

const cnGallery = cn(styles);

export const Gallery: FC = () => {
    const { data } = useQuery(getUploadsQueryOptions);

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
                {data?.map(upload => (
                    <UploadPreview
                        key={upload.id}
                        id={upload.id}
                        status={upload.status}
                        title={upload.name}
                        previewUrl={upload.url}
                        description={formatDistanceToNow(upload.date, { locale: ru, addSuffix: true })}
                    />
                ))}
            </GalleryBase>
        </div>
    );
};
