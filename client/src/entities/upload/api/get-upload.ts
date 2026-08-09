import { uploadSchema } from '../model';

import { api } from '@/shared/api';

export const getUploadRequest = async (id: string) => {
    return await api({
        url: `/uploads/${id}`,
        method: 'GET',
        schema: uploadSchema,
    });
};
