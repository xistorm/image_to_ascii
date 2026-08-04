import type { RegistrationFormSchema } from './schema';

import { login, signupRequest } from '@/entities/user';

export const registrationAction = async (data: RegistrationFormSchema) => {
    const user = await signupRequest(data);

    login(user);
};
