import type { FC } from 'react';

import styles from './Gallery.module.css';
import type { IGalleryProps } from './Gallery.typings';

import { cn } from '@/shared/utils';

const cnGallery = cn(styles);

export const Gallery: FC<IGalleryProps> = ({
    className,
    children,
}) => {
    return (
        <div className={cnGallery('Gallery', [className])}>
            {children}
        </div>
    );
};
