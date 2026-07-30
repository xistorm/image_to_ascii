import type { HTMLInputTypeAttribute, MouseEventHandler } from 'react';

export interface IFormInputIconProps {
    className?: string;
    type: HTMLInputTypeAttribute;
    currentType: HTMLInputTypeAttribute;
    onClick?: MouseEventHandler;
}
