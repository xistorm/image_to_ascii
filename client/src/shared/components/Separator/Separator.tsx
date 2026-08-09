import type { FC } from 'react';

import type { ISeparatorProps } from './Separator.typings';
import styles from './Separator.module.css';

import { cn } from '@/shared/utils';

const cnSeparator = cn(styles);

export const Separator: FC<ISeparatorProps> = ({
    className,
    direction,
}) => {
    return (
        <span className={cnSeparator('Separator', [className], { direction })}/>
    );
};
