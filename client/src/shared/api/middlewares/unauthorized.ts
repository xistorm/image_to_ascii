import type { AxiosResponse } from 'axios';
import StatusCode from 'status-code-enum';
import { redirect } from '@tanstack/react-router';

import { queryClient } from '@/shared/api';
import { removeAuthToken } from '@/shared/storage';

export const unauthorizedMiddleware = async (response: AxiosResponse) => {
    if (response.status === StatusCode.ClientErrorUnauthorized) {
        await queryClient.invalidateQueries({ queryKey: ['user'] });

        removeAuthToken();
        redirect({ to: '/login' });
    }

    return response;
};
