import { z } from 'zod';

import { uploadSchema } from '../model';

import { api } from '@/shared/api';

export const getUploadsResponseSchema = z
    .array(uploadSchema);

export type GetUploadsResponse = z.infer<typeof getUploadsResponseSchema>;

export const getUploadsRequest = async () => {
    return await api({
        url: '/uploads',
        method: 'GET',
        schema: getUploadsResponseSchema,
    });
};
