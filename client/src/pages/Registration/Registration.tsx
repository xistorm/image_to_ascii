import { type FC, useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { type RegistrationFormSchema, registrationFormSchema } from './Registration.schema';

import { AuthForm } from '@/widgets/AuthForm';
import { login, signupMutationOptions } from '@/entities/user';
import { Input } from '@/shared/components/Input';
import { Link } from '@/shared/components/Link';
import { Button } from '@/shared/components/Button';
import { useFormApiError } from '@/shared/components/Form/Form.hooks';

export const Registration: FC = () => {
    const { mutate } = useMutation(signupMutationOptions);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(registrationFormSchema),
    });

    const onError = useFormApiError(control);

    const onSubmit = useCallback<SubmitHandler<RegistrationFormSchema>>((data) => {
        mutate(data, {
            onSuccess: login,
            onError,
        });
    }, [mutate, onError]);

    return (
        <AuthForm
            title="Регистрация"
            description="Создайте аккаунт, чтобы конвертировать фотографии в ASCII-арт и управлять результатами в терминале."
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            redirect={{
                description: 'Уже есть аккаунт?',
                text: 'Войти',
                to: '/login',
            }}
        >
            <Input
                {...register('login')}
                id="login"
                type="text"
                placeholder="user-login"
                errors={errors}
                required
            >Логин</Input>
            <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="user@email.adress"
                errors={errors}
                required
            >Электронная почта</Input>
            <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="password"
                errors={errors}
                required
            >Пароль</Input>
            <Input
                {...register('repeat_password')}
                id="repeat_password"
                type="password"
                placeholder="password"
                errors={errors}
                required
            >Повторите пароль</Input>
            <Input
                {...register('agreement')}
                id="agreement"
                type="checkbox"
                errors={errors}
                required
            >
                <span>Я согласен с <Link to="/">Условиями использования</Link> и <Link to="/">Политикой конфиденциальности</Link></span>
            </Input>
            <Button text="Зарегистрироваться" type="submit"/>
        </AuthForm>
    );
};
