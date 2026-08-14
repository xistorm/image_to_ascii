import type { NavigationBarItem } from './NavigationBar.typings';

export const NAVIGATION_ITEMS: NavigationBarItem[] = [
    {
        id: 'gallery',
        to: '/uploads',
        text: 'Галерея',
    },
    {
        id: 'new_photo',
        to: '/create',
        text: 'Новое фото',
    },
];
