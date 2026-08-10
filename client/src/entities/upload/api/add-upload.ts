import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { uploadModel } from '../model';

import { api } from '@/shared/api';

export const addUploadRequestSchema = z
    .object({
        file: z.file(),
    })
    .transform((data) => {
        const formData = new FormData();
        formData.append('file', data.file, data.file.name);
        formData.append('id', uuid());
        formData.append('name', data.file.name);
        formData.append('type', data.file.type);

        return formData;
    });

export type AddUploadRequest = z.input<typeof addUploadRequestSchema>;

export const addUploadRequest = async (data: AddUploadRequest) => {
    return await api({
        url: '/upload/',
        method: 'PUT',
        inputSchema: addUploadRequestSchema,
        outputSchema: uploadModel,
        data,
    });
};
