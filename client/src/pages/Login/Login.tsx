import { Button, Input } from '@/shared/ui/components';
import { AuthForm } from '@/widgets';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { type FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginAction, type LoginFormSchema, loginSchema } from './Login.model';

export const Login: FC = () => {
    const navigate = useNavigate();

    const form = useForm<LoginFormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(loginSchema),
    });

    const errors = form.formState.errors;

    const onSubmit = useCallback<SubmitHandler<LoginFormSchema>>(async (data) => {
        await loginAction(data);
        await navigate({ to: '/create' });
    }, []);

    return (
        <AuthForm
            title="Добро пожаловать"
            description="Войдите в свой терминал, чтобы конвертировать фотографии в ASCII-арт и управлять результатами."
            form={form}
            onSubmit={onSubmit}
            redirect={{
                description: 'Нет аккаунта?',
                text: 'Зарегистрироваться',
                to: '/registration',
            }}
        >
            <Input
                {...form.register('login')}
                type="text"
                id="text"
                placeholder="user-login"
                errors={errors}
                required
            >Логин</Input>
            <Input
                {...form.register('password')}
                type="password"
                id="password"
                placeholder="password"
                errors={errors}
                required
            >Пароль</Input>
            <Input
                {...form.register('remember')}
                type="checkbox"
                id="remember"
                errors={errors}
            >Запомнить меня</Input>
            <Button text="Войти" type="submit"/>
        </AuthForm>
    );
};
