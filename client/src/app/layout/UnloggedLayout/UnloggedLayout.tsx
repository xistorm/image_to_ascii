import { cn } from '@/shared/utils';
import { HeroPanel } from '@/widgets';
import { Outlet } from '@tanstack/react-router';
import type { FC } from 'react';

import styles from './UnloggedLayout.module.css';

const cnUnloggedLayout = cn(styles);

export const UnloggedLayout: FC = () => {
    return (
        <div className={cnUnloggedLayout('UnloggedLayout')}>
            <HeroPanel/>
            <Outlet/>
        </div>
    );
};
