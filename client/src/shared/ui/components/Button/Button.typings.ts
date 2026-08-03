import type { ButtonHTMLAttributes, ElementType } from 'react';

export type ButtonView = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: ElementType<unknown, 'div' | 'button'>;
    text: string;
    view?: ButtonView;
    active?: boolean;
}
