import { type FC } from 'react';
import { useStore } from '@nanostores/react';

import type { IUploadViewProps } from './UploadView.typings';
import { UploadViewCard } from './-Card';
import styles from './UploadView.module.css';
import { $theme } from '@/entities/theme';
import { findUploadImage } from '@/entities/upload';

import { Image } from '@/shared/components/Image';
import { cn } from '@/shared/utils';

const cnUploadView = cn(styles);

export const UploadView: FC<IUploadViewProps> = ({
    upload,
}) => {
    const theme = useStore($theme);

    const original = findUploadImage(upload.files, 'original', 'common');
    const ascii = findUploadImage(upload.files, 'ascii', theme);

    return (
        <div className={cnUploadView('UploadView')}>
            <UploadViewCard title="Оригинал">
                <Image
                    className={cnUploadView('UploadView-Image')}
                    alt={original?.name}
                    src={original?.url}
                />
            </UploadViewCard>
            <UploadViewCard title="ASCII Art">
                <Image
                    className={cnUploadView('UploadView-Image')}
                    alt={ascii?.name}
                    src={ascii?.url}
                />
            </UploadViewCard>
        </div>
    );
};
