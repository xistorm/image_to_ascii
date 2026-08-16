import { type FC } from 'react';

import type { IUploadViewCardProps } from './UploadView-Card.typings';
import styles from './UploadView-Card.module.css';

import { CopyButton } from '@/features/CopyButton';
import { cn } from '@/shared/utils';

const cnUploadView = cn(styles);

export const UploadViewCard: FC<IUploadViewCardProps> = ({
    title,
    onCopy,
    children,
}) => {
    return (
        <div className={cnUploadView('UploadViewCard')}>
            <div className={cnUploadView('UploadViewCard-Header')}>
                <span className={cnUploadView('UploadViewCard-Title')}>{title}</span>
                {onCopy && <CopyButton onCopy={onCopy}/>}
            </div>

            <div className={cnUploadView('UploadViewCard-Content')}>
                {children}
            </div>
        </div>
    );
};
