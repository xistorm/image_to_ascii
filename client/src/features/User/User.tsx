import type { FC } from 'react';
import { useStore } from '@nanostores/react';

import { UserAvatar } from './-Avatar';
import { UserMenu } from './-Menu';
import styles from './User.module.css';

import { $user } from '@/entities/user';
import { cn } from '@/shared/utils';
import { useToggle } from '@/shared/hooks';
import { Popup } from '@/shared/ui/components';

const cnUser = cn(styles);

export const User: FC = () => {
    const { isOpened, toggleIsOpened, close } = useToggle();
    const user = useStore($user);

    if (!user) {
        return null;
    }

    return (
        <div className={cnUser('User')}>
            <div
                className={cnUser('User-Content')}
                onClick={toggleIsOpened}
            >
                <span className={cnUser('User-Login')}>{user.login}</span>
                <UserAvatar/>
            </div>

            <Popup
                className={cnUser('User-Popup')}
                isOpened={isOpened}
                onOutsideClick={close}
                direction="bottom-right"
            >
                <UserMenu/>
            </Popup>
        </div>
    );
};
