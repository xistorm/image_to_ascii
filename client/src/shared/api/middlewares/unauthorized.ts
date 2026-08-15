import type { AxiosResponse } from 'axios';
import StatusCode from 'status-code-enum';

import { queryClient } from '../query';

import { authStorage } from '@/shared/storage';

export const unauthorized = async (response: AxiosResponse) => {
    if (response.status === StatusCode.ClientErrorUnauthorized) {
        await queryClient.invalidateQueries({ queryKey: ['user'] });

        authStorage.clear();
    }

    return response;
};
