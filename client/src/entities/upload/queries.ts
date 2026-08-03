import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { getFile, getFiles, uploadFile } from './api';
import type { UploadModel } from './model';

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
