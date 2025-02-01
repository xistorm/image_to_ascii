import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, VideoLoadPage } from '@pages';
import { Layout } from '@shared/layouts';
import { useAuthorizeQuery } from '@services/auth/authApi';
import { useAppDispatch } from '@/app/hooks';
import { login, logout } from '@features/auth/slice';
import { ProtectedRoute, PublicRoute } from './components';


export const App: FC = () => {
	const dispatch = useAppDispatch();
	const { data: user, error } = useAuthorizeQuery();

	useEffect(() => {
		if (user) {
			dispatch(login(user));
		} else if (error) {
			dispatch(logout());
		}
	}, [user, error]);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index path='/' element={
						<ProtectedRoute>
							<VideoLoadPage />
						</ProtectedRoute>
					} />
					<Route path='/login' element={
						<PublicRoute strict={true}>
							<LoginPage />
						</PublicRoute>
					} />
					<Route path='/register' element={
						<PublicRoute strict={true}>
							<RegisterPage />
						</PublicRoute>
					} />
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
