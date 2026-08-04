import { useEffect } from 'react';

import { $theme } from '@/entities/theme';

export const useTheme = () => {
    useEffect(() => {
        const unsubscribe = $theme.subscribe((theme) => {
            document.documentElement.setAttribute('data-theme', theme);
        });

        return () => {
            unsubscribe();
        };
    }, []);
};
