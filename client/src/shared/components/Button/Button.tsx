import { FC, ReactNode } from 'react';
import { Effect, noop } from '@shared/utils/events/events';
import classNames from 'classnames';

import { button, buttonActive, buttonPrimary, buttonSecondary } from './button.module.css';


type ButtonProps = {
	type?: HTMLButtonElement['type'];
	style?: 'primary' | 'secondary';
	disabled?: boolean;
	onClick?: Effect<MouseEvent>;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	type = 'button',
	style = 'primary',
	disabled,
	onClick = noop,
	children,
}) => {
	const styleClass = {
		'primary': buttonPrimary,
		'secondary': buttonSecondary,
	}[style];

	return (
		<button
			className={classNames(button, styleClass, !disabled && buttonActive)}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>{children}</button>
	);
};
