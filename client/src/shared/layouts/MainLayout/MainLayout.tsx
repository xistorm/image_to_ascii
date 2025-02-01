import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

import { container, content } from './main-layout.module.css';


export const MainLayout: FC = () => {
	return (
		<div className={container}>
			<Header />
			<div className={content}>
				<Outlet />
			</div>
		</div>
	);
};
