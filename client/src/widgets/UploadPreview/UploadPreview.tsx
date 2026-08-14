import { type FC, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { IUploadPreviewProps } from './UploadPreview.typings';
import styles from './UploadPreview.module.css';

import { UploadStatus } from '@/features/UploadStatus';
import { cn } from '@/shared/utils';

const cnUploadPreview = cn(styles);

export const UploadPreview: FC<IUploadPreviewProps> = ({
    id,
    status,
    title,
    description,
    previewUrl,
}) => {
    const navigate = useNavigate();
    const onClick = useCallback(async () => {
        await navigate({
            to: '/uploads/$uploadId',
            params: {
                uploadId: id,
            },
        });
    }, [navigate, id]);

    return (
        <div
            className={cnUploadPreview('UploadPreview', [], { status })}
            onClick={onClick}
        >
            <img
                className={cnUploadPreview('UploadPreview-Image')}
                alt={id}
                src={previewUrl}
            />

            <div className={cnUploadPreview('UploadPreview-Content')}>
                <div className={cnUploadPreview('UploadPreview-Info')}>
                    <span className={cnUploadPreview('UploadPreview-Title')}>{title}</span>
                    <span className={cnUploadPreview('UploadPreview-Description')}>{description}</span>
                </div>

                <UploadStatus status={status}/>
            </div>
        </div>
    );
};
