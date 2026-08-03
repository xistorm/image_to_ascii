import type { FC } from 'react';
import { Outlet } from '@tanstack/react-router';

import styles from './UnloggedLayout.module.css';

import { HeroPanel } from '@/widgets/HeroPanel';
import { cn } from '@/shared/utils';

const cnUnloggedLayout = cn(styles);

export const UnloggedLayout: FC = () => {
    return (
        <div className={cnUnloggedLayout('UnloggedLayout')}>
            <HeroPanel/>
            <Outlet/>
        </div>
    );
};
