import { FC } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@features/auth/slice';

import { logoutButton } from './logout-button.module.css';


export const LogoutButton: FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(logout());
	};

	return (
		<button className={logoutButton} type='button' onClick={handleClick}>Выйти</button>
	);
};
