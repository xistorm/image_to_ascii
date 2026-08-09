import type { FC } from 'react';
import { useStore } from '@nanostores/react';

import { LogoutButton } from '../-LogoutButton';
import { UserAvatar } from '../-Avatar';
import styles from './User-Menu.module.css';

import { $user } from '@/entities/user';
import { Separator } from '@/shared/components/Separator';
import { cn } from '@/shared/utils';

const cnUserMenu = cn(styles);

export const UserMenu: FC = () => {
    const user = useStore($user);

    if (!user) {
        return;
    }

    return (
        <div className={cnUserMenu('UserMenu')}>
            <div className={cnUserMenu('UserMenu-Header')}>
                <UserAvatar/>
                <div className={cnUserMenu('UserMenu-Info')}>
                    <span className={cnUserMenu('UserMenu-Title')}>{user.login}</span>
                    {user.email && <span className={cnUserMenu('UserMenu-Description')}>{user.email}</span>}
                </div>
            </div>

            <Separator direction="horizontal"/>

            <LogoutButton/>
        </div>
    );
};
