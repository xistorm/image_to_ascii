import { cn } from '@/shared/utils';
import type { FC } from 'react';

import styles from './Button.module.css';
import type { IButtonProps } from './Button.typings';

const cnButton = cn(styles);

export const Button: FC<IButtonProps> = ({
    className,
    as: ButtonTag = 'button',
    view = 'primary',
    type = 'button',
    text,
    disabled,
    active,
    ...rest
}) => {
    return (
        <ButtonTag
            className={cnButton('Button', [className], { active, disabled, view })}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {text}
        </ButtonTag>
    );
};
