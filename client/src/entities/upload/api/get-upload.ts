import { z } from 'zod';

import { uploadModel } from '../model';

import { api } from '@/shared/api';

export const getUploadRequest = async (id: string) => {
    return await api({
        url: `/uploads/${id}`,
        method: 'GET',
        inputSchema: z.undefined(),
        outputSchema: uploadModel,
    });
};
