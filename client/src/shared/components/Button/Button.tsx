import type { FC } from 'react';

import type { IButtonProps } from './Button.typings';
import styles from './Button.module.css';

import { cn } from '@/shared/utils';

const cnButton = cn(styles);

export const Button: FC<IButtonProps> = ({
    className,
    as: ButtonTag = 'button',
    view = 'primary',
    type = 'button',
    text,
    disabled,
    active,
    children,
    ...rest
}) => {
    return (
        <ButtonTag
            className={cnButton('Button', [className], { active, disabled, view })}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {children}
            {text}
        </ButtonTag>
    );
};
