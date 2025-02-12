import { FC } from 'react';
import { FileInput } from '@features/file/components';
import { useImageSelector } from '@features/file/slice';
import { ConvertImage } from '@features/file/components/ConvertFile/ConvertImage';

import { asciiCode } from './file-load-page.module.css';

export const FileLoadPage: FC = () => {
	const { file, ascii } = useImageSelector();


	if (!file) {
		return (
			<FileInput accept={['image/*']} />
		);
	}

	if (!ascii) {
		return (
			<ConvertImage file={file} />
		);
	}

	return (
		<span className={asciiCode}>{ascii}</span>
	);
};
