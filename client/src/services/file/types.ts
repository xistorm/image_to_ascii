import { User } from '@services/auth/types';

export type FileData = {
	id: string;
	name: string;
	type: string;
	original: string;
}

export type ConvertedFileData = FileData & {
	ascii: string;
}

export type UploadRequest = {
	file: FileData;
	user: User;
}

export type UploadResponse = {
	id: string;
}
