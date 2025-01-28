import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@shared/layouts/Layout/Layout';
import { ProtectedRoute } from '@shared/utils/protected-route/ProtectedRoute';
import { LoginPage } from '@pages/Login/LoginPage';
import { VideoLoadPage } from '@pages/VideoLoad/VideoLoad';


export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index path='/' element={
						<ProtectedRoute>
							<VideoLoadPage />
						</ProtectedRoute>
					} />
					<Route index path='/login' element={<LoginPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
