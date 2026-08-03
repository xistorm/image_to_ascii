import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './Gallery.module.css';

import { UploadsGallery } from '@/widgets/UploadsGallery';
import { getFilesQueryOptions } from '@/entities/upload';
import { Button, Link } from '@/shared/ui/components';
import { cn } from '@/shared/utils';

const cnGallery = cn(styles);

export const Gallery: FC = () => {
    const { data = [] } = useQuery(getFilesQueryOptions());

    return (
        <div className={cnGallery('Gallery')}>
            <div className={cnGallery('Gallery-Header')}>
                <div className={cnGallery('Gallery-Info')}>
                    <span className={cnGallery('Gallery-Title')}>Моя галерея</span>
                    <span className={cnGallery('Gallery-Description')}>ASCII-арт, который вы уже сгенерировали</span>
                </div>
                <Link to="/create">
                    <Button text="Загрузить новое фото"/>
                </Link>
            </div>

            <UploadsGallery
                items={data?.map(upload => ({
                    id: upload.id,
                    status: upload.status,
                    title: upload.name,
                    previewUrl: upload.url,
                    description: upload.date.toLocaleString(),
                }))}
            />
        </div>
    );
};
