import type { FC } from 'react';
import { useStore } from '@nanostores/react';

import AvatarPlaceholder from '../User.assets/avatar-placeholder.svg?react';
import styles from './UserAvatar.module.css';

import { $user } from '@/entities/user';
import { cn } from '@/shared/utils';

const cnUserAvatar = cn(styles);

export const UserAvatar: FC = () => {
    const user = useStore($user);

    return (
        <div className={cnUserAvatar('UserAvatar')}>
            {user?.avatar ?
                <img className={cnUserAvatar('UserAvatar-Image')} alt={user.login} src={user.avatar}/> :
                <AvatarPlaceholder className={cnUserAvatar('UserAvatar-Placeholder')}/>
            }
        </div>
    );
};
