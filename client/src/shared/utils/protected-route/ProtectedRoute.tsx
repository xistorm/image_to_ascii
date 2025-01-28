import { FC, ReactNode } from 'react';
import { useAuthSelector } from '@features/auth/selectors';
import { Navigate } from 'react-router-dom';


type ProtectedRoutesProps = {
	children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRoutesProps> = ({ children }) => {
	const { token } = useAuthSelector();

	if (!token) {
		return (
			<Navigate to='/login' />
		);
	}

	return children;
};
