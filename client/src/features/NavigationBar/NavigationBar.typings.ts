import type { ToPathOption } from '@tanstack/react-router';

export interface NavigationBarItem {
    id: string;
    to: ToPathOption;
    text: string;
}
