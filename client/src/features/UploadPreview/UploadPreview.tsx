import type { FC } from 'react';

import { getUploadStatus } from './UploadPreview.utils';
import type { IUploadPreviewProps } from './UploadPreview.typings';
import styles from './UploadPreview.module.css';

import { cn } from '@/shared/utils';

const cnUploadPreview = cn(styles);

export const UploadPreview: FC<IUploadPreviewProps> = ({
    id,
    status,
    title,
    description,
    previewUrl,
}) => {
    return (
        <div className={cnUploadPreview('UploadPreview', [], { status })}>
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

                <span className={cnUploadPreview('UploadPreview-Status')}>{getUploadStatus(status)}</span>
            </div>
        </div>
    );
};
