import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, VideoLoadPage } from '@pages';
import { Layout } from '@shared/layouts';
import { ProtectedRoute } from '@shared/utils';
import { useAuthorizeQuery } from '@services/auth/authApi';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@features/auth/slice';


export const App: FC = () => {
	const dispatch = useAppDispatch();
	const { data: user, error } = useAuthorizeQuery();

	useEffect(() => {
		if (user) {
			dispatch(login(user));
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
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
