import { atom, computed } from 'nanostores';
import type { User } from './model';

export const $user = atom<User | undefined>({
    login: 'xistorm',
    password: '12354',
});

export const $isAuthenticated = computed($user, user => Boolean(user));

export const setUser = (user: User) => $user.set(user);
