import { z } from 'zod';

import { type UploadModel, uploadSchema } from './model';

import { api } from '@/shared/api';

export const getUploadsRequest = async () => {
    return await api({
        url: '/uploads',
        method: 'GET',
        schema: z.array(uploadSchema),
    });
};

export const getUploadRequest = async (id: string) => {
    return await api({
        url: `/uploads/${id}`,
        method: 'GET',
        schema: uploadSchema,
    });
};

export const addUploadRequest = async (data: UploadModel) => {
    return await api<z.ZodNever, UploadModel>({
        url: '/uploads',
        method: 'POST',
        schema: z.never(),
        data,
    });
};
