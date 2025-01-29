import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Effect } from '@shared/utils/events/events';

import { input, inputContainer, inputLabel } from './input.module.css';


type InputProps = {
	type: HTMLInputElement['type'];
	name: string;
	label: string;
	defaultValue?: string;
	placeholder?: string;
	onChange?: Effect<string>;
}

export const Input: FC<InputProps> = ({
	type,
	name,
	label,
	defaultValue = '',
	placeholder = '',
	onChange,
}) => {
	const [value, setValue] = useState<string>(defaultValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;

		setValue(newValue);
	};

	useEffect(() => {
		onChange?.(value);
	}, [value]);

	return (
		<div className={inputContainer}>
			<label
				className={inputLabel}
				htmlFor={name}
			>{label}</label>
			<input
				className={input}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				autoComplete='none'
				onChange={handleChange}
			/>
		</div>
	);
};
