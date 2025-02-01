import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthSelector } from '@features/auth/slice';


type ProtectedRoutesProps = {
	strict?: boolean;
	children: ReactNode;
}

export const PublicRoute: FC<ProtectedRoutesProps> = ({
	strict = false,
	children,
}) => {
	const { isLoading, isAuthorized } = useAuthSelector();

	if (!isLoading && isAuthorized && !strict) {
		return children;
	}

	return (
		<Navigate to='/' />
	);
};
