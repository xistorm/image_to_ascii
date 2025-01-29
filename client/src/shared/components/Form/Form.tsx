import { ChangeEvent, FC, FormEvent, ReactNode } from 'react';
import { cancelEvent, Effect } from '@shared/utils/events/events';

import { form, formContent, formDescription, formTitle } from './form.module.css';


type FormProps = {
	title: string;
	description: string;
	onChange?: Effect<HTMLInputElement>;
	onSubmit?: Effect<HTMLFormElement>;
	children: ReactNode;
};

export const Form: FC<FormProps> = ({
	title,
	description,
	onChange,
	onSubmit,
	children,
}) => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		cancelEvent(event);

		const target = event.currentTarget;

		onSubmit?.(target);
	};

	const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) {
			return;
		}

		onChange?.(target);
	};

	return (
		<form className={form} onSubmit={handleSubmit} onChange={handleChange}>
			<h2 className={formTitle}>{title}</h2>
			<span className={formDescription}>{description}</span>
			<div className={formContent}>{children}</div>
		</form>
	);
};
