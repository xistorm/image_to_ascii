import { type FC } from 'react';
import { Outlet } from '@tanstack/react-router';

import { useAuthorization, useTheme } from './RootLayout.hooks';
import styles from './RootLayout.module.css';

import { cn } from '@/shared/utils';

const cnRootLayout = cn(styles);

export const RootLayout: FC = () => {
    const isLoading = useAuthorization();

    useTheme();

    if (isLoading) {
        return (
            <div>loading</div>
        );
    }

    return (
        <div className={cnRootLayout('RootLayout')}>
            <Outlet/>
        </div>
    );
};
