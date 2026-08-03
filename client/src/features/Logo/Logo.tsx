import { type FC, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import LogoIcon from './Logo.assets/logo.svg?react';
import type { ILogoProps } from './Logo.typings';
import styles from './Logo.module.css';

import { cn } from '@/shared/utils';

const cnLogo = cn(styles);

export const Logo: FC<ILogoProps> = ({
    interactive,
}) => {
    const navigate = useNavigate();

    const onClick = useCallback(async () => {
        if (!interactive) {
            return;
        }

        await navigate({ to: '/' });
    }, [navigate, interactive]);

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
