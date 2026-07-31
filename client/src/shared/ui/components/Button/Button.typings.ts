import type { ButtonHTMLAttributes } from 'react';

export type ButtonView = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    view?: ButtonView;
    active?: boolean;
}
