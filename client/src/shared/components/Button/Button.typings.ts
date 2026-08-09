import type { ButtonHTMLAttributes, ElementType } from 'react';

export type ButtonView = 'none' | 'primary' | 'secondary' | 'ghost' | 'dangerous';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: ElementType<any, 'div' | 'button'>;
    text?: string;
    view?: ButtonView;
    active?: boolean;
}
