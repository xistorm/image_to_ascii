import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Link } from '@shared/components';
import { useForm } from '@shared/hooks';
import { LoginRequest } from '@services/auth/types';
import { useLoginMutation } from '@services/auth/authApi';

import { FORM_DESCRIPTION, FORM_TITLE } from './constants';

import { registerLink, suggests } from './login-form.module.css';
import { setToken } from '@shared/utils';


export const LoginForm: FC = () => {
	const navigate = useNavigate();

	const [sendRequest, { data, error }] = useLoginMutation();
	const [, handleChange, handleSubmit] = useForm<LoginRequest>({
		login: '',
		password: '',
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
			<div className={suggests}>
				<Checkbox name='remember' label='Запомнить меня' />
				<Link to='/register' size='small'>Забыли пароль?</Link>
			</div>
			<Button type='submit'>Войти</Button>
			<span className={registerLink}>Еще не зарегестрированы? <Link to='/register'>Создайте аккаунт</Link></span>
		</Form>
	);
};
