import { type FC } from 'react';

import type { IUploadViewProps } from './UploadView.typings';
import { UploadViewCard } from './-Card';
import styles from './UploadView.module.css';
import { useTextCanvas } from '@/widgets/UploadView/UploadView.hooks';

import { cn } from '@/shared/utils';

const cnUploadView = cn(styles);

export const UploadView: FC<IUploadViewProps> = ({
    upload,
}) => {
    const textCanvas = useTextCanvas(upload);

    return (
        <div className={cnUploadView('UploadView')}>
            <UploadViewCard
                title="Оригинал"
                alt={upload.name}
                url={upload.url}
            />
            <UploadViewCard
                title="ASCII Art"
                alt={upload.name}
                url={textCanvas}
            />
        </div>
    );
};
