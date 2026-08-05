import type { FC } from 'react';
import { Outlet } from '@tanstack/react-router';

import styles from './UnloggedLayout.module.css';

import { HeroPanel } from '@/widgets/HeroPanel';
import { ThemeToggle } from '@/features/ThemeToggle';
import { cn } from '@/shared/utils';

const cnUnloggedLayout = cn(styles);

export const UnloggedLayout: FC = () => {
    return (
        <div className={cnUnloggedLayout('UnloggedLayout')}>
            <div className={cnUnloggedLayout('UnloggedLayout-Controls')}>
                <ThemeToggle/>
            </div>

            <div className={cnUnloggedLayout('UnloggedLayout-Content')}>
                <HeroPanel/>
                <Outlet/>
            </div>
        </div>
    );
};
