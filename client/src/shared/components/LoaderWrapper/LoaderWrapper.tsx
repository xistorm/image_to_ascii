import { type FC, useCallback } from 'react';

import type { ILoaderWrapperProps } from './LoaderWrapper.typings';
import styles from './LoaderWrapper.module.css';

import { Loader } from '@/shared/components/Loader';
import { cn } from '@/shared/utils';

const cnLoaderWrapper = cn(styles);

export const LoaderWrapper: FC<ILoaderWrapperProps> = ({
    className,
    isLoading = false,
    size = 'xl',
    children,
}) => {
    const renderContent = useCallback(() => {
        if (!isLoading) {
            return children;
        }

        return (
            <div className={cnLoaderWrapper('LoaderWrapper-Content')}>
                <Loader size={size}/>
            </div>
        );
    }, [isLoading, size, children]);

    return (
        <div className={cnLoaderWrapper('LoaderWrapper', [className])}>
            {renderContent()}
        </div>
    );
};
