import { type FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { loginFormSchema, type LoginFormSchema } from './Login.schema';

import { AuthForm } from '@/widgets/AuthForm';
import { login, loginMutationOptions } from '@/entities/user';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useFormApiError } from '@/shared/components/Form/Form.hooks';

export const Login: FC = () => {
    const { mutate, isPending } = useMutation(loginMutationOptions);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginFormSchema),
    });

    const onError = useFormApiError(control);

    const onSubmit = useCallback<SubmitHandler<LoginFormSchema>>((data) => {
        mutate(data, {
            onSuccess: login,
            onError,
        });
    }, [mutate, onError]);

    return (
        <AuthForm
            title="Добро пожаловать"
            description="Войдите в свой терминал, чтобы конвертировать фотографии в ASCII-арт и управлять результатами."
            errors={errors}
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
            <Button
                type="submit"
                text="Войти"
                disabled={isPending}
            />
        </AuthForm>
    );
};
