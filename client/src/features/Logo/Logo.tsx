import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { type FC, useCallback } from "react";
import LogoIcon from './Logo.assets/logo.svg?react';

import styles from './Logo.module.css';

const cnLogo = cn(styles);

export const Logo: FC = () => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate({ to: '/' });
    }, []);

    return (
        <div
            className={cnLogo('Logo')}
            onClick={onClick}
        >
            <LogoIcon className={cnLogo('Logo-Icon')}/>
            <span className={cnLogo('Logo-Title')}>PixelFlow</span>
        </div>
    );
};
