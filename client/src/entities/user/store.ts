import { atom, computed } from 'nanostores';

import type { UserModel } from './model';
import { removeAuthToken, setAuthToken } from '@/shared/storage';

export const $user = atom<UserModel | undefined>();

export const $isAuthenticated = computed($user, user => {
    return Boolean(user);
});

export const login = (user: UserModel) => {
    $user.set(user);
    setAuthToken(user.token);
};

export const logout = () => {
    $user.set(undefined);
    removeAuthToken();
};
