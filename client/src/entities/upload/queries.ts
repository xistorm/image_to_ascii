import type { DefaultError, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { addUploadRequest, getUploadRequest, getUploadsRequest } from './api';
import type { UploadModel } from './model';

export const getFilesQueryOptions = () => ({
    queryKey: ['upload', 'list'],
    queryFn: getUploadsRequest,
} satisfies UseQueryOptions);

export const getFileQueryOptions = (id: string) => ({
    queryKey: ['upload', id],
    queryFn: () => getUploadRequest(id),
} satisfies UseQueryOptions);

export const uploadFileQueryOptions = () => ({
    mutationKey: ['upload'],
    mutationFn: addUploadRequest,
} satisfies UseMutationOptions<UploadModel, DefaultError, UploadModel>);
