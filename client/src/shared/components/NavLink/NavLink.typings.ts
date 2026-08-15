import type { ToPathOption } from '@tanstack/react-router';

export interface INavLinkProps {
    className?: string;
    to: ToPathOption;
    text: string;
    active?: boolean;
    disabled?: boolean;
}
