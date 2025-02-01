import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, VideoLoadPage } from '@pages';
import { Layout } from '@shared/layouts';
import { ProtectedRoute } from '@shared/utils';
import { useAuthorizeQuery } from '@services/auth/authApi';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@features/auth/slice';
import { removeToken } from '@shared/utils/token/token';
import { PublicRoute } from '@/routes/components/PublicRoute/PublicRoute';


export const App: FC = () => {
	const dispatch = useAppDispatch();
	const { data: user, error } = useAuthorizeQuery();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (user) {
			dispatch(login(user));
		} else if (error) {
			removeToken();
		}
		setLoading(false);
	}, [user, error]);

	return (
		<BrowserRouter>
			<Routes>
				{!loading &&
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
				}
			</Routes>
		</BrowserRouter>
	);
};
