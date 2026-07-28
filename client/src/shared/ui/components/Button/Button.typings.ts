import type { EventHandler, SyntheticEvent } from "react";

export type ButtonView = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps {
    className?: string;
    text: string;
    view?: ButtonView;
    disabled?: boolean;
    active?: boolean;
    onClick?: EventHandler<SyntheticEvent>;
}