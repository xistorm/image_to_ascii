import { type FC, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import styles from './RootLayout.module.css';

import { $theme } from '@/entities/theme';
import { cn } from '@/shared/utils';

const cnRootLayout = cn(styles);

export const RootLayout: FC = () => {
    useEffect(() => {
        const unsubscribe = $theme.subscribe((theme) => {
            document.documentElement.setAttribute('data-theme', theme);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className={cnRootLayout('RootLayout')}>
            <Outlet/>
        </div>
    );
};
