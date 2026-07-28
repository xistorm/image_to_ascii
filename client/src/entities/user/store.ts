import { atom, computed } from "nanostores";
import type { User } from "./typings";

export const $user = atom<User | undefined>({
    login: 'xistorm',
    password: 'kekw',
});

export const $isAuthenticated = computed($user, user => Boolean(user));
