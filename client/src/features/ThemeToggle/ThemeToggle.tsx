import { type FC, useCallback } from 'react';
import { useStore } from '@nanostores/react';

import LightIcon from './ThemeToggle.assets/light.svg?react';
import DarkIcon from './ThemeToggle.assets/dark.svg?react';
import styles from './ThemeToggle.module.css';

import { $theme, toggleTheme } from '@/entities/theme';
import { Button } from '@/shared/ui/components';
import { cn } from '@/shared/utils';

const cnThemeToggle = cn(styles);

export const ThemeToggle: FC = () => {
    const theme = useStore($theme);

    const onClick = useCallback(() => {
        toggleTheme();
    }, []);

    const Icon = (() => {
        switch (theme) {
            case 'light':
                return LightIcon;
            case 'dark':
                return DarkIcon;
        }
    })();

    return (
        <Button
            className={cnThemeToggle('ThemeToggle')}
            view="none"
            onClick={onClick}
        >
            <Icon/>
        </Button>
    );
};
