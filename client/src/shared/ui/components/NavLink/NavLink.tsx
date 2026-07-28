import type { INavLinkProps } from "@/shared/ui/components/NavLink/NavLink.typings";
import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

import styles from "./NavLink.module.css";

const cnNavLink = cn(styles);

export const NavLink: FC<INavLinkProps> = ({
    className,
    to,
    text,
    disabled,
    active,
}) => {
    return (
        <div className={cnNavLink('NavLink-Wrapper')}>
            <Link
                className={cnNavLink('NavLink', [className], { active, disabled })}
                disabled={disabled}
                to={to}
            >
                {text}
            </Link>
        </div>
    );
};
