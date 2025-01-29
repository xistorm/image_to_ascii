import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Effect, noop } from '@shared/utils/events/events';

import { checkbox, checkboxChecked, checkboxContainer, checkboxInput, checkboxLabel } from './checkbox.module.css';


type CheckboxProps = {
	name: string;
	label: string;
	defaultValue?: boolean;
	onChange?: Effect<boolean>;
};

export const Checkbox: FC<CheckboxProps> = ({
	label,
	name,
	defaultValue = false,
	onChange,
}) => {
	const [checked, setChecked] = useState<boolean>(defaultValue);

	const toggle = () => {
		setChecked(checked => !checked);
	};

	useEffect(() => {
		onChange?.(checked);
	}, [checked]);

	return (
		<div className={checkboxContainer} onClick={toggle}>
			<input
				className={checkboxInput}
				type='checkbox'
				name={name}
				checked={checked}
				onChange={noop}
			/>
			<div className={classNames(checkbox, checked && checkboxChecked)} />
			<label className={checkboxLabel} htmlFor={name}>{label}</label>
		</div>
	);
};
