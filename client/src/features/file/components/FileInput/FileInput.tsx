import { ChangeEvent, FC, useRef } from 'react';
import { Button } from '@shared/components';

import { input, label } from './file-input.module.css';
import { useAppDispatch } from '@/app/hooks';
import { loadImage } from '@features/file/slice';


type FileInputProps = {
	accept?: string[];
};

export const FileInput: FC<FileInputProps> = ({
	accept = ['*'],
}) => {
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = () => {
		inputRef.current?.click();
	};

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		dispatch(loadImage(file));
	};

	return (
		<div>
			<label className={label} htmlFor='file-input'>
				<Button onClick={handleFileUpload}>Выбрать файл</Button>
			</label>
			<input
				className={input}
				type='file'
				id='file-input'
				name='file-input'
				ref={inputRef}
				accept={accept.join(', ')}
				onChange={handleFileSelect}
			/>
		</div>
	);
};
