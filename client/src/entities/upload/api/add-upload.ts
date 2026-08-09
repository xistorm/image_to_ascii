import { type UploadModel, uploadSchema } from '../model';

import { api } from '@/shared/api';

export const addUploadRequest = async (data: UploadModel) => {
    return await api({
        url: '/uploads',
        method: 'POST',
        schema: uploadSchema,
        data,
    });
};
