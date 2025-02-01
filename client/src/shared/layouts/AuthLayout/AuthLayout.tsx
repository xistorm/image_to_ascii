import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawingManImage, Header } from '../components';

import { container, content } from './auth-layout.module.css';


export const AuthLayout: FC = () => {
	return (
		<div className={container}>
			<Header />
			<div className={content}>
				<Outlet />
				<DrawingManImage />
			</div>
		</div>
	);
};
