import type { LoginFormSchema } from './schema';
import { login, loginRequest } from '@/entities/user';

export const loginAction = async (data: LoginFormSchema) => {
    const user = await loginRequest(data);

    login(user);
};
