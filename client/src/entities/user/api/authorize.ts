import { z } from 'zod';

import { userModel } from '../model';

import { api } from '@/shared/api';

export const authorizeRequest = async () => {
    return await api({
        url: '/auth',
        method: 'GET',
        inputSchema: z.undefined(),
        outputSchema: userModel,
    });
};
