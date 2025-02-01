import { FC } from 'react';
import { useAuthSelector } from '@features/auth/slice';
import { AuthLayout, MainLayout } from '@shared/layouts';


export const Layout: FC = () => {
	const { isAuthorized } = useAuthSelector();

	return (
		isAuthorized ? <MainLayout /> : <AuthLayout />
	);
};
