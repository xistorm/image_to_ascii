import { FC } from 'react';
import { Logo } from '@shared/components/Logo/Logo';

import { header } from './header.module.css';

export const Header: FC = () => {
	return (
		<div className={header}>
			<Logo />
		</div>
	);
};
