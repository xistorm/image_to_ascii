import type { FC } from 'react';
import { useRouterState } from '@tanstack/react-router';

import { NAVIGATION_ITEMS } from './NavigationBar.const';
import styles from './NavigationBar.module.css';

import { NavLink } from '@/shared/components/NavLink';
import { cn } from '@/shared/utils';

const cnNavigationBar = cn(styles);

export const NavigationBar: FC = () => {
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    return (
        <div className={cnNavigationBar('NavigationBar')}>
            {NAVIGATION_ITEMS.map(item => (
                <NavLink
                    key={item.id}
                    to={item.to}
                    text={item.text}
                    active={item.to === currentPath}
                />
            ))}
        </div>
    );
};
