import type { PropsWithChildren } from 'react';
import type { VoidFunction } from '@/shared/utils';

export interface IPopupProps extends PropsWithChildren {
    className?: string;
    isOpened?: boolean;
    direction?: 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'right-top' | 'right-bottom';
    onOutsideClick?: VoidFunction;
}
