import { type FC } from 'react';

import type { IUploadViewProps } from './UploadView.typings';
import { UploadViewCard } from './-Card';
import styles from './UploadView.module.css';
import { AsciiImage } from '@/features/AsciiImage/AsciiImage';

import { Image } from '@/shared/components/Image';
import { cn } from '@/shared/utils';
import { useImageSize } from '@/shared/components/Image/Image.hooks';

const cnUploadView = cn(styles);

export const UploadView: FC<IUploadViewProps> = ({
    upload,
}) => {
    const { size } = useImageSize(upload.url);

    return (
        <div className={cnUploadView('UploadView')}>
            <UploadViewCard title="Оригинал">
                <Image
                    className={cnUploadView('UploadView-Image')}
                    alt={upload.name}
                    src={upload.url}
                />
            </UploadViewCard>
            <UploadViewCard title="ASCII Art">
                <AsciiImage
                    className={cnUploadView('UploadView-Image')}
                    alt={upload.name}
                    size={size}
                    params={upload.params}
                    frames={upload.generation}
                />
            </UploadViewCard>
        </div>
    );
};
