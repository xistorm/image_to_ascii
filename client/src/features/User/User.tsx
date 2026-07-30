import { $user } from '@/entities/user';
import { cn } from '@/shared/utils';
import { useStore } from '@nanostores/react';
import type { FC } from 'react';
import DefaultAvatar from './User.assets/default-avatar.png';

import styles from './User.module.css';

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
