import { atom, computed } from 'nanostores';

import type { User } from './model';

export const $user = atom<User | undefined>();

export const $isAuthenticated = computed($user, user => Boolean(user));

export const setUser = (user: User) => $user.set(user);
