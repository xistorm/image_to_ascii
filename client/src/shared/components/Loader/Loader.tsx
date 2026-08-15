import type { FC } from 'react';

import LoaderIcon from './Loader.assets/loader.svg?react';
import type { ILoaderProps } from './Loader.typings';
import styles from './Loader.module.css';

import { cn } from '@/shared/utils';

const cnLoader = cn(styles);

export const Loader: FC<ILoaderProps> = ({
    className,
    size = 'm',
    ...rest
}) => {
    return (
        <div
            className={cnLoader('Loader', [className], { size })}
            {...rest}
        >
            <LoaderIcon/>
        </div>
    );
};
