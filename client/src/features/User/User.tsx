import type { FC } from 'react';
import { useStore } from '@nanostores/react';

import DefaultAvatar from './User.assets/default-avatar.png';
import styles from './User.module.css';

import { $user } from '@/entities/user';
import { cn } from '@/shared/utils';

const cnUser = cn(styles);

export const User: FC = () => {
    const user = useStore($user);

    if (!user) {
        return null;
    }

    return (
        <div className={cnUser('User')}>
            <span className={cnUser('User-Login')}>{user.login}</span>
            <img className={cnUser('User-Avatar')} alt={user.login} src={user.avatar || DefaultAvatar}/>
        </div>
    );
};
