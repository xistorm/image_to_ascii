import { atom } from 'nanostores';

import type { Theme } from './model';

import { createLsStorage } from '@/shared/utils';

const themeStorage = createLsStorage<Theme>('ascii.image.theme', 'light');

const initTheme = themeStorage.get();

export const $theme = atom<Theme>(initTheme);

$theme.subscribe((theme) => themeStorage.set(theme));

export const setTheme = (theme: Theme) => {
    $theme.set(theme);
};

export const toggleTheme = () => {
    const nextTheme = $theme.get() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
};
