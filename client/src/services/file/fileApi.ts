import { baseApi } from '../api/api';
import { ConvertedFileData, FileData, UploadRequest, UploadResponse } from './types';
import { TAG_TYPE } from '@services/api/constants';


export const fileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		convert: builder.mutation<ConvertedFileData, FileData>({
			query: (data) => ({
				url: 'images/convert',
				method: 'POST',
				body: data,
			}),
		}),
		upload: builder.mutation<UploadResponse, UploadRequest>({
			query: (data) => ({
				url: 'images/upload',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: [TAG_TYPE.FILE],
		}),
	}),
});

export const { useConvertMutation, useUploadMutation } = fileApi;
