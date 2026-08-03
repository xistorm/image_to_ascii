import type { RegistrationFormSchema } from './schema';

import { setUser } from '@/entities/user';

export const registrationAction = async (data: RegistrationFormSchema) => {
    setUser({
        login: data.login,
        password: data.password,
    });
};
