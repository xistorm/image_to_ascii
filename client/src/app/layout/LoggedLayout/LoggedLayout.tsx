import type { FC } from 'react';
import { Outlet } from '@tanstack/react-router';

import styles from './LoggedLayout.module.css';

import { Header } from '@/widgets/Header';
import { cn } from '@/shared/utils';

const cnLoggedLayout = cn(styles);

export const LoggedLayout: FC = () => {
    return (
        <div className={cnLoggedLayout('LoggedLayout')}>
            <Header/>
            <div className={cnLoggedLayout('LoggedLayout-Content')}>
                <Outlet/>
            </div>
        </div>
    );
};
