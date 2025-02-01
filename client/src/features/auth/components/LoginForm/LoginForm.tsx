import { FC } from 'react';
import { Button, Checkbox, Form, Input, Link } from '@shared/components';
import { LoginRequest } from '@services/auth/types';
import { useLoginMutation } from '@services/auth/authApi';
import { useAuthMutation } from '@features/auth/hooks/useAuthMutation';

import { FORM_DESCRIPTION, FORM_TITLE } from './constants';

import { registerLink, suggests } from './login-form.module.css';


export const LoginForm: FC = () => {
	const [handleChange, handleSubmit] = useAuthMutation<LoginRequest>({
		login: '',
		password: '',
	}, useLoginMutation);

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
			<span className={registerLink}>Еще не зарегистрированы? <Link to='/register'>Создайте аккаунт</Link></span>
		</Form>
	);
};
