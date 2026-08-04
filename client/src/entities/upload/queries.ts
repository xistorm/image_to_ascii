import type { DefaultError, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { getFileRequest, getFilesRequest, uploadFileRequest } from './api';
import type { UploadModel } from './model';

export const getFilesQueryOptions = () => ({
    queryKey: ['upload', 'list'],
    queryFn: getFilesRequest,
} satisfies UseQueryOptions);

export const getFileQueryOptions = (id: string) => ({
    queryKey: ['upload', id],
    queryFn: () => getFileRequest(id),
} satisfies UseQueryOptions);

export const uploadFileQueryOptions = () => ({
    mutationKey: ['upload'],
    mutationFn: uploadFileRequest,
} satisfies UseMutationOptions<UploadModel, DefaultError, UploadModel>);
