import { cn } from '@/shared/utils';
import { Header } from '@/widgets';
import { Outlet } from '@tanstack/react-router';
import type { FC } from 'react';

import styles from './LoggedLayout.module.css';

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
