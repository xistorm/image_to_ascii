import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { useAppSelector } from '@/app/hooks';
import { FileData } from '@services/image/types';
import { Buffer } from 'buffer';


export enum FileStatus {
	NONE = 'none',
	LOADING = 'loading',
	LOADED = 'loaded',
	ERRORED = 'errored',
	PROCESSED = 'processed',
}

type FileState = {
	file?: FileData;
	status: FileStatus;
	ascii?: string;
};

const initialState: FileState = {
	status: FileStatus.NONE,
};

export const loadImage = createAsyncThunk<FileData, File>('file/load', async (file) => {
	const buffer = await file.arrayBuffer();
	const content = Buffer.from(buffer).toString('base64');

	return {
		id: uuid.v4(),
		name: file.name,
		type: file.type,
		original: content,
	} satisfies FileData;
});

const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers: {
		'clear': (state) => {
			state.status = FileStatus.NONE;
			state.file = undefined;
		},
		'convert': (state, action: PayloadAction<string>) => {
			state.ascii = Buffer.from(action.payload, 'base64').toString();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadImage.pending, (state) => {
				state.status = FileStatus.LOADING;
			})
			.addCase(loadImage.fulfilled, (state, action) => {
				state.status = FileStatus.LOADED;
				state.file = action.payload;
			})
			.addCase(loadImage.rejected, (state) => {
				state.status = FileStatus.ERRORED;
			});
	},
});

export const useImageSelector = () => useAppSelector(state => state.file);
export const { clear, convert } = fileSlice.actions;
export default fileSlice.reducer;
