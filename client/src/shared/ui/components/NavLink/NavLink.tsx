import { cn } from '@/shared/utils';
import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import styles from './NavLink.module.css';
import type { INavLinkProps } from './NavLink.typings';

const cnNavLink = cn(styles);

export const NavLink: FC<INavLinkProps> = ({
    className,
    to,
    text,
    disabled,
    active,
}) => {
    return (
        <Link
            className={cnNavLink('NavLink', [className], { active, disabled })}
            disabled={disabled}
            to={to}
        >
            {text}
        </Link>
    );
};
