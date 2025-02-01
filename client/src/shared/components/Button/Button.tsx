import { FC, ReactNode } from 'react';
import { Effect, noop } from '@shared/utils/events/events';

import { button } from './button.module.css';


type ButtonProps = {
	type?: HTMLButtonElement['type'];
	onClick?: Effect<MouseEvent>;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	type = 'button',
	onClick = noop,
	children,
}) => {
	return (
		<button
			className={button}
			type={type}
			onClick={onClick}
		>{children}</button>
	);
};
