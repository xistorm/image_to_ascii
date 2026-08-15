import { type FC } from 'react';
import { Outlet } from '@tanstack/react-router';

import { useAuthorization, useTheme } from './RootLayout.hooks';
import styles from './RootLayout.module.css';

import { LoaderWrapper } from '@/features/LoaderWrapper';
import { cn } from '@/shared/utils';

const cnRootLayout = cn(styles);

export const RootLayout: FC = () => {
    const isLoading = useAuthorization();

    useTheme();

    return (
        <LoaderWrapper
            className={cnRootLayout('RootLayout')}
            isLoading={isLoading}
            size="xl"
        >
            <Outlet/>
        </LoaderWrapper>
    );
};
