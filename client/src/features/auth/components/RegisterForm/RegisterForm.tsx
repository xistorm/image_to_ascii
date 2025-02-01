import { FC } from 'react';
import * as uuid from 'uuid';
import { Button, Form, Input, Link } from '@shared/components';
import { useRegisterMutation } from '@services/auth/authApi';
import { User } from '@services/auth/types';
import { useAuthMutation } from '@features/auth/hooks/useAuthMutation';

import { FORM_DESCRIPTION, FORM_TITLE } from './constants';

import { loginLink } from './register-form.module.css';


export const RegisterForm: FC = () => {
	const [handleChange, handleSubmit] = useAuthMutation<User>({
		id: uuid.v4(),
		email: '',
		login: '',
		password: '',
	}, useRegisterMutation);

	return (
		<Form title={FORM_TITLE} description={FORM_DESCRIPTION} onChange={handleChange} onSubmit={handleSubmit}>
			<Input
				type='email'
				name='email'
				label='Электронная почта'
				placeholder='Введите свою почту'
			/>
			<Input
				type='text'
				name='login'
				label='Логин'
				placeholder='Введите свой логин'
			/>
			<Input
				type='password'
				name='password'
				label='Пароль'
				placeholder='Введите свой пароль'
			/>
			<Button type='submit'>Войти</Button>
			<span className={loginLink}>Уже зарегистрированы? <Link to='/login'>Войдите</Link></span>
		</Form>
	);
};
