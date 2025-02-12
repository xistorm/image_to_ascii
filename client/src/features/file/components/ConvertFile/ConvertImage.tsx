import { FC, useEffect } from 'react';
import { Image } from '@services/image/types';
import { Button } from '@shared/components';
import { bufferToURI } from '@shared/utils/file/file';
import { useConvertMutation } from '@services/image/imageApi';
import { useAppDispatch } from '@/app/hooks';
import { clear, convert } from '@features/file/slice';

import { container, preview, title } from './convert-file.module.css';


type ConvertFileProps = {
	file: Image;
}

export const ConvertFile: FC<ConvertFileProps> = ({
	file,
}) => {
	const dispatch = useAppDispatch();
	const [handleConvertMutation, { data, error }] = useConvertMutation();

	useEffect(() => {
		if (data) {
			dispatch(convert(data.ascii));
		}
	}, [data, error]);

	const handleConvertFile = () => {
		handleConvertMutation(file);
	};

	const handleRemoveFile = () => {
		dispatch(clear());
	};

	return (
		<div className={container}>
			<img className={preview} alt='' src={bufferToURI(file.type, file.original)} />
			<h3 className={title}>{file.name}</h3>
			<Button onClick={handleConvertFile}>Конвертировать</Button>
			<Button style='secondary' onClick={handleRemoveFile}>Назад</Button>
		</div>
	);
};
