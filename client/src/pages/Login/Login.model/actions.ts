import type { LoginFormSchema } from './schema';

import { setUser } from '@/entities/user';

export const loginAction = async (data: LoginFormSchema) => {
    setUser({
        login: data.login,
        password: data.password,
    });
};
