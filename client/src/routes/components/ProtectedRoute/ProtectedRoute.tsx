import { FC } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuthSelector } from '@features/auth/selectors';


export const ProtectedRoute: FC<RouteProps> = (props) => {
	const { token } = useAuthSelector();

	return token ? (
		<Route {...props} />
	) : (
		<Navigate to="/login" />
	);
};
