import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import { $theme } from '@/entities/theme';

export const useTheme = () => {
    const theme = useStore($theme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
};
