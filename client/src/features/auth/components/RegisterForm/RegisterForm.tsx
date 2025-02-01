import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as uuid from 'uuid';
import { Button, Form, Input, Link } from '@shared/components';
import { useForm } from '@shared/hooks';
import { useRegisterMutation } from '@services/auth/authApi';
import { User } from '@services/auth/types';

import { FORM_DESCRIPTION, FORM_TITLE } from './constants';

import { loginLink } from './register-form.module.css';
import { setToken } from '@shared/utils';


export const RegisterForm: FC = () => {
	const navigate = useNavigate();

	const [sendRequest, { data, error }] = useRegisterMutation();
	const [, handleChange, handleSubmit] = useForm<User>({
		login: '',
		password: '',
		email: '',
		id: uuid.v4(),
	}, sendRequest);

	useEffect(() => {
		if (data) {
			setToken(data.token);
			navigate('/');
		}
	}, [data, error]);

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
			<span className={loginLink}>Уже зарегестрированы? <Link to='/login'>Войдите</Link></span>
		</Form>
	);
};
