import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { logo } from './logo.module.css';


export const Logo: FC = () => {
	const navigator = useNavigate();

	const handleClick = () => {
		navigator('/');
	};
	
	return (
		<h3 className={logo} onClick={handleClick}>ascii_text</h3>
	);
};
