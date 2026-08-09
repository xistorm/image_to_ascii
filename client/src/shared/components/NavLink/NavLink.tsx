import type { FC } from 'react';
import { Link } from '@tanstack/react-router';

import type { INavLinkProps } from './NavLink.typings';
import styles from './NavLink.module.css';

import { cn } from '@/shared/utils';

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
