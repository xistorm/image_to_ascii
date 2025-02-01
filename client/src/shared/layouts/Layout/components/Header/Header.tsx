import { FC } from 'react';
import { Logo } from '@shared/components/Logo/Logo';
import { LogoutButton } from '@features/auth/components';

import { header } from './header.module.css';
import { useAuthSelector } from '@features/auth/slice';

export const Header: FC = () => {
	const { isAuthorized } = useAuthSelector();

	return (
		<div className={header}>
			<Logo />
			{isAuthorized && <LogoutButton />}
		</div>
	);
};
