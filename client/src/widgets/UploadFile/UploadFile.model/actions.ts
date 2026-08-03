import type { UploadFileSchema } from '@/widgets/UploadFile/UploadFile.model/schema';

export const uploadAction = async (data: UploadFileSchema) => {
    console.log(data);
};
