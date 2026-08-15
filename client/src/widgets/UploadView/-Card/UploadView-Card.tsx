import { type FC } from 'react';

import type { IUploadViewCardProps } from './UploadView-Card.typings';
import styles from './UploadView-Card.module.css';

import { LoaderWrapper } from '@/features/LoaderWrapper';
import { CopyButton } from '@/features/CopyButton';
import { cn } from '@/shared/utils';

const cnUploadView = cn(styles);

export const UploadViewCard: FC<IUploadViewCardProps> = ({
    title,
    alt,
    url,
    onCopy,
}) => {
    return (
        <div className={cnUploadView('UploadViewCard')}>
            <div className={cnUploadView('UploadViewCard-Header')}>
                <span className={cnUploadView('UploadViewCard-Title')}>{title}</span>
                {onCopy && <CopyButton onCopy={onCopy}/>}
            </div>

            <LoaderWrapper
                className={cnUploadView('UploadViewCard-Content')}
                size="m"
                isLoading={!url}
            >
                <img
                    className={cnUploadView('UploadViewCard-Image')}
                    alt={alt}
                    src={url}
                />
            </LoaderWrapper>
        </div>
    );
};
