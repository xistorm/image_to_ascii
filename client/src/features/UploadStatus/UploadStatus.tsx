import type { FC } from 'react';

import type { IUploadStatusProps } from './UploadStatus.typings';
import { getUploadStatusText } from './UploadStatus.utils';
import styles from './UploadStatus.module.css';

import { cn } from '@/shared/utils';

const cnUploadStatus = cn(styles);

export const UploadStatus: FC<IUploadStatusProps> = ({
    status,
}) => {
    const text = getUploadStatusText(status);

    return (
        <span className={cnUploadStatus('UploadStatus', [], { status })}>{text}</span>

    );
};
