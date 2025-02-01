import { FC } from 'react';
import drawingMan from '@assets/images/drawing_man.png';

import { drawingManImage } from './drawing-man-image.module.css';


export const DrawingManImage: FC = () => {
	return <img className={drawingManImage} alt='' src={drawingMan} />;
};
