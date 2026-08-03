import { getFile, getFiles, uploadFile } from '@/entities/upload/api';
import type { UploadModel } from '@/entities/upload/model';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export const getFilesQueryOptions = () => ({
    queryKey: ['upload', 'list'],
    queryFn: () => getFiles(),
} satisfies UseQueryOptions);

export const getFileQueryOptions = (id: string) => ({
    queryKey: ['upload', id],
    queryFn: () => getFile(id),
} satisfies UseQueryOptions);

export const uploadFileQueryOptions = (data: UploadModel) => ({
    mutationKey: ['upload'],
    mutationFn: () => uploadFile(data),
} satisfies UseMutationOptions);
