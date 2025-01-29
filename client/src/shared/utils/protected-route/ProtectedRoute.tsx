import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthSelector } from '@features/auth/slice';


type ProtectedRoutesProps = {
	children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRoutesProps> = ({ children }) => {
	const { user } = useAuthSelector();

	if (!user) {
		return (
			<Navigate to='/login' />
		);
	}

	return children;
};
