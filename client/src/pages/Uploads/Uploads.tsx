import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useStore } from '@nanostores/react';

import styles from './Uploads.module.css';

import { UploadPreview } from '@/widgets/UploadPreview';
import { findUploadImage, getUploadsQueryOptions } from '@/entities/upload';
import { $theme } from '@/entities/theme';
import { LoaderWrapper } from '@/shared/components/LoaderWrapper';
import { Link } from '@/shared/components/Link';
import { Button } from '@/shared/components/Button';
import { Gallery } from '@/shared/components/Gallery';
import { cn } from '@/shared/utils';

const cnUploads = cn(styles);

export const Uploads: FC = () => {
    const { data, isLoading } = useQuery(getUploadsQueryOptions);
    const theme = useStore($theme);

    return (
        <LoaderWrapper
            className={cnUploads('Uploads')}
            isLoading={isLoading}
        >
            <div className={cnUploads('Uploads-Header')}>
                <div className={cnUploads('Uploads-Info')}>
                    <span className={cnUploads('Uploads-Title')}>Моя галерея</span>
                    <span className={cnUploads('Uploads-Description')}>ASCII-арт, который вы уже сгенерировали</span>
                </div>
                <Link view="secondary" to="/create">
                    <Button text="Загрузить новое фото"/>
                </Link>
            </div>

            <Gallery>
                {data?.map(upload => {
                    const original = findUploadImage(upload.files, 'original', 'common');
                    if (!original) {
                        return null;
                    }
                    const ascii = findUploadImage(upload.files, 'ascii', theme);

                    return <UploadPreview
                        key={upload.id}
                        id={upload.id}
                        status={upload.status}
                        title={original.name}
                        previewUrl={original.url}
                        asciiUrl={ascii?.url}
                        description={formatDistanceToNow(upload.date, { locale: ru, addSuffix: true })}
                    />;
                })}
            </Gallery>
        </LoaderWrapper>
    );
};
