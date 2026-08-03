import { setUser } from '@/entities/user';
import type { LoginFormSchema } from './schema';

export const loginAction = async (data: LoginFormSchema) => {
    setUser({
        login: data.login,
        password: data.password,
    });
};
