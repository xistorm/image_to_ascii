import { setUser } from '@/entities/user';
import type { RegistrationFormSchema } from './schema';

export const registrationAction = async (data: RegistrationFormSchema) => {
    setUser({
        login: data.login,
        password: data.password,
    });
};
