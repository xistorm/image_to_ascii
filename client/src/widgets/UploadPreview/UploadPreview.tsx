import { type FC, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';

import type { IUploadPreviewProps } from './UploadPreview.typings';
import styles from './UploadPreview.module.css';

import { UploadStatus } from '@/features/UploadStatus';
import { DeleteUploadButton } from '@/features/DeleteUploadButton';
import { Image } from '@/shared/components/Image';
import { cn } from '@/shared/utils';
import { useHover } from '@/shared/hooks';

const cnUploadPreview = cn(styles);

export const UploadPreview: FC<IUploadPreviewProps> = ({
    id,
    status,
    title,
    description,
    previewUrl,
    asciiUrl,
}) => {
    const navigate = useNavigate();
    const { hoverRef, isHovered } = useHover<HTMLDivElement>();

    const imageUrl = isHovered ? asciiUrl : previewUrl;

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
            ref={hoverRef}
            onClick={onClick}
        >
            <div className={cnUploadPreview('UploadPreview-Preview')}>
                <Image
                    className={cnUploadPreview('UploadPreview-Image')}
                    alt={id}
                    src={imageUrl}
                />
            </div>

            <div className={cnUploadPreview('UploadPreview-Content')}>
                <div className={cnUploadPreview('UploadPreview-Info')}>
                    <span className={cnUploadPreview('UploadPreview-Title')}>{title}</span>
                    <span className={cnUploadPreview('UploadPreview-Description')}>{description}</span>
                </div>

                <div className={cnUploadPreview('UploadPreview-Controls')}>
                    <UploadStatus status={status}/>
                    <DeleteUploadButton uploadId={id}/>
                </div>
            </div>
        </div>
    );
};
