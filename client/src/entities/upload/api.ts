import { z } from 'zod';

import { type UploadModel, uploadSchema } from './model';

import { api } from '@/shared/api';

export const getFilesRequest = async () => {
    return Promise.resolve<UploadModel[]>([
        {
            id: 'kekw1',
            url: '',
            name: 'studio_portrait_v2.jpg',
            date: new Date(),
            status: 'success',
        },
        {
            id: 'kekw2',
            url: '',
            name: 'cyberpunk_city_hdr.png',
            date: new Date(),
            status: 'pending',
        },
        {
            id: 'kekw3',
            url: '',
            name: 'mountain_landscape_raw.png  ',
            date: new Date(),
            status: 'error',
        },
    ]);
    // return await api({
    //     url: '/upload',
    //     method: 'GET',
    //     schema: z.array(uploadSchema),
    // });
};

export const getFileRequest = async (id: string) => {
    return await api({
        url: `/upload/${id}`,
        method: 'GET',
        schema: uploadSchema,
    });
};

export const uploadFileRequest = async (data: UploadModel) => {
    return await api<z.ZodNever, UploadModel>({
        url: '/upload',
        method: 'POST',
        schema: z.never(),
        data,
    });
};
