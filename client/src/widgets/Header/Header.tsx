import { Logo, NavigationBar, User } from "@/features";
import { cn } from "@/shared/utils";
import type { FC } from "react";

import styles from './Header.module.css';

const cnHeader = cn(styles);

export const Header: FC = () => {
    return (
        <div className={cnHeader('Header')}>
            <Logo/>
            <NavigationBar/>
            <User/>
        </div>
    );
};
