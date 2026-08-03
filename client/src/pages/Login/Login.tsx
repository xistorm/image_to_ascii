import { type FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

import { loginAction, type LoginFormSchema, loginSchema } from './Login.model';

import { AuthForm } from '@/widgets/AuthForm';
import { Button, Input } from '@/shared/ui/components';

export const Login: FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = useCallback<SubmitHandler<LoginFormSchema>>(async (data) => {
        await loginAction(data);
        await navigate({ to: '/gallery' });
    }, [navigate]);

    return (
        <AuthForm
            title="Добро пожаловать"
            description="Войдите в свой терминал, чтобы конвертировать фотографии в ASCII-арт и управлять результатами."
            onSubmit={handleSubmit(onSubmit)}
            redirect={{
                description: 'Нет аккаунта?',
                text: 'Зарегистрироваться',
                to: '/registration',
            }}
        >
            <Input
                {...register('login')}
                type="text"
                id="text"
                placeholder="user-login"
                errors={errors}
                required
            >Логин</Input>
            <Input
                {...register('password')}
                type="password"
                id="password"
                placeholder="password"
                errors={errors}
                required
            >Пароль</Input>
            <Input
                {...register('remember')}
                type="checkbox"
                id="remember"
                errors={errors}
            >Запомнить меня</Input>
            <Button text="Войти" type="submit"/>
        </AuthForm>
    );
};
