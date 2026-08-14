import { type FC, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';

import styles from './Upload.module.css';

import { UploadView } from '@/widgets/UploadView/UploadView';
import { UploadStatus } from '@/features/UploadStatus';
import { getUploadQueryOptions } from '@/entities/upload';
import { cn } from '@/shared/utils';
import { Button } from '@/shared/components/Button';

const cnUpload = cn(styles);

export const Upload: FC = () => {
    const navigate = useNavigate();

    const { uploadId } = useParams({ from: '/_logged/uploads/$uploadId' });
    const { data } = useQuery(getUploadQueryOptions(uploadId));

    const onClickGallery = useCallback(async () => {
        await navigate({ to: '/uploads' });
    }, [navigate]);

    const onClickMore = useCallback(async () => {
        await navigate({ to: '/create' });
    }, [navigate]);

    return (
        <div className={cnUpload('Upload')}>
            <div className={cnUpload('Upload-Header')}>
                <div className={cnUpload('Upload-Info')}>
                    <span className={cnUpload('Upload-Title')}>ASCII-результат</span>
                    <span className={cnUpload('Upload-Description')}>Фото успешно конвертировано в ASCII-арт</span>
                </div>
                <UploadStatus status={data?.status || 'pending'}/>
            </div>

            {data && <UploadView upload={data}/>}

            <div className={cnUpload('Upload-Controls')}>
                <Button view="primary" onClick={onClickMore}>Конвертировать ещё</Button>
                <Button view="ghost" onClick={onClickGallery}>Все загрузки</Button>
            </div>
        </div>
    );
};
