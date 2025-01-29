import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { link, regular, small } from './link.module.css';


type LinkProps = {
	size?: 'small' | 'regular';
	to: string;
	children: ReactNode;
};

export const Link: FC<LinkProps> = ({
	size = 'regular',
	to,
	children,
}) => {
	const navigate = useNavigate();

	const sizeClass = {
		'small': small,
		'regular': regular,
	}[size];

	const handleClick = () => {
		navigate(to);
	};

	return (
		<span className={classNames(link, sizeClass)} onClick={handleClick}>{children}</span>
	);
};
