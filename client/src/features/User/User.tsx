import type { FC } from 'react';
import { useStore } from '@nanostores/react';

import AvatarPlaceholder from './User.assets/avatar-placeholder.svg?react';
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
            <div className={cnUser('User-Avatar')}>
                {user.avatar ?
                    <img className={cnUser('User-Image')} alt={user.login} src={user.avatar}/> :
                    <AvatarPlaceholder className={cnUser('User-Placeholder')}/>
                }
            </div>
        </div>
    );
};
