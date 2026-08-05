import type { FC } from 'react';

import styles from './Header.module.css';

import { Logo } from '@/features/Logo';
import { NavigationBar } from '@/features/NavigationBar';
import { User } from '@/features/User';
import { ThemeToggle } from '@/features/ThemeToggle';
import { cn } from '@/shared/utils';

const cnHeader = cn(styles);

export const Header: FC = () => {
    return (
        <div className={cnHeader('Header')}>
            <Logo interactive/>
            <NavigationBar/>
            <div className={cnHeader('Header-Controls')}>
                <ThemeToggle/>
                <User/>
            </div>
        </div>
    );
};
