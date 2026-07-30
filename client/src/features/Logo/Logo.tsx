import { cn } from '@/shared/utils';
import { useNavigate } from '@tanstack/react-router';
import { type FC, useCallback } from 'react';
import LogoIcon from './Logo.assets/logo.svg?react';

import styles from './Logo.module.css';
import type { ILogoProps } from './Logo.typings';

const cnLogo = cn(styles);

export const Logo: FC<ILogoProps> = ({
    interactive,
}) => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        if (!interactive) {
            return;
        }

        navigate({ to: '/' });
    }, []);

    return (
        <div
            className={cnLogo('Logo', [], { interactive })}
            onClick={onClick}
        >
            <LogoIcon className={cnLogo('Logo-Icon')}/>
            <span className={cnLogo('Logo-Title')}>PixelFlow</span>
        </div>
    );
};
