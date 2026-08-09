import { atom, computed } from 'nanostores';

import type { UserModel } from './model';
import { authStorage } from '@/shared/storage';

export const $user = atom<UserModel | undefined>();

export const $isAuthenticated = computed($user, user => {
    return Boolean(user);
});

export const login = (user: UserModel) => {
    $user.set(user);
    authStorage.set(user.token);
};

export const logout = () => {
    $user.set(undefined);
    authStorage.clear();
};
