import { getLsValue, setLsValue } from '@/shared/utils';
import { atom } from 'nanostores';
import type { Theme } from './model';

const LS_KEY = 'ascii.image.theme';

const initTheme = getLsValue<Theme>(LS_KEY, 'light');

export const $theme = atom<Theme>(initTheme);

export const setTheme = (theme: Theme) => {
    $theme.set(theme);
    setLsValue(LS_KEY, theme);
};

export const toggleTheme = () => {
    const nextTheme = $theme.get() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
};
