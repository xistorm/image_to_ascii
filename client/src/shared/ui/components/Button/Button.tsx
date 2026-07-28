import type { IButtonProps } from "@/shared/ui/components/Button/Button.typings";
import { cn } from "@/shared/utils";
import type { FC } from "react";

import styles from './Button.module.css';

const cnButton = cn(styles);

export const Button: FC<IButtonProps> = ({
    className,
    view = 'primary',
    text,
    disabled,
    active,
    onClick,
}) => {
    return (
        <button
            className={cnButton('Button', [className], { active, disabled, view })}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
