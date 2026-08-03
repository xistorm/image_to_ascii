import { type UploadModel, uploadSchema } from '@/entities/upload/model';
import { api } from '@/shared/api/client';
import { z } from 'zod';

export const getFiles = async () => {
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

export const getFile = async (id: string) => {
    return await api({
        url: `/upload/${id}`,
        method: 'GET',
        schema: uploadSchema,
    });
};

export const uploadFile = async (data: UploadModel) => {
    return await api<z.ZodNever, UploadModel>({
        url: '/upload',
        method: 'POST',
        schema: z.never(),
        data,
    });
};
