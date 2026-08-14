import { z } from 'zod';

import { uploadModel } from '../model';

import { api } from '@/shared/api';

const getUploadsResponse = z
    .array(uploadModel)
    .nullable()
    .transform((data) => data ?? []);

export const getUploadsRequest = async () => {
    return await api({
        url: '/uploads/',
        method: 'GET',
        inputSchema: z.undefined(),
        outputSchema: getUploadsResponse,
    });
};
