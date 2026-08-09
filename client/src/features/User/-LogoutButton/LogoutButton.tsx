import { type FC, useCallback } from 'react';

import LogoutIcon from '../User.assets/logout.svg?react';
import styles from './LogoutButton.module.css';

import { logout } from '@/entities/user';
import { Button } from '@/shared/components/Button';
import { cn } from '@/shared/utils';

const cnLogoutButton = cn(styles);

export const LogoutButton: FC = () => {
    const onClick = useCallback(() => {
        logout();
    }, []);

    return (
        <Button
            className={cnLogoutButton('LogoutButton')}
            view="dangerous"
            onClick={onClick}
        >
            <LogoutIcon width={16} height={16}/>
            Выйти
        </Button>
    );
};
