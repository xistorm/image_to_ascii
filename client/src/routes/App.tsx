import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@shared/layouts/Layout/Layout';
import { LoginPage } from '@pages/Login/LoginPage';


export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index path='/login' element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
