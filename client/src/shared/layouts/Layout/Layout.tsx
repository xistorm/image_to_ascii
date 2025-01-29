import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components';

import { container, content } from './layout.module.css';


export const Layout: FC = () => {
	return (
		<div className={container}>
			<Header />
			<div className={content}>
				<Outlet />
			</div>
		</div>
	);
};
