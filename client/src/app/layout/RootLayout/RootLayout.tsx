import { $theme } from '@/entities/theme';
import { Outlet } from '@tanstack/react-router';
import { type FC, useEffect } from 'react';

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
        <>
            <Outlet/>
        </>
    );
};
