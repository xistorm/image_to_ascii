import { FC } from 'react';
import { Header } from '@shared/layouts/Layout/components/Header/Header';

import { container } from './layout.module.css';
import { Outlet } from 'react-router-dom';


export const Layout: FC = () => {
	return (
		<div className={container}>
			<Header />
			<Outlet />
		</div>
	);
};
