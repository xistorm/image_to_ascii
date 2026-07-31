import { setUser } from '@/entities/user';
import type { LoginFormSchema } from './schema';

export const loginAction = async (data: LoginFormSchema) => {
    console.log(data);
    setUser({
        login: data.login,
        password: data.password,
    });
};
