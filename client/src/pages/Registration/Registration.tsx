import { Button, Input, Link } from '@/shared/ui/components';
import { AuthForm } from '@/widgets';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { type FC, useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { registrationAction, type RegistrationFormSchema, registrationSchema } from './Registration.model';

export const Registration: FC = () => {
    const navigate = useNavigate();

    const form = useForm<RegistrationFormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = useCallback<SubmitHandler<RegistrationFormSchema>>(async (data) => {
        await registrationAction(data);
        await navigate({ to: '/' });
    }, []);

    return (
        <AuthForm
            title="Регистрация"
            description="Создайте аккаунт, чтобы конвертировать фотографии в ASCII-арт и управлять результатами в терминале."
            form={form}
            onSubmit={onSubmit}
            redirect={{
                description: 'Уже есть аккаунт?',
                text: 'Войти',
                to: '/login',
            }}
        >
            <Input
                {...form.register('login')}
                id="login"
                type="text"
                placeholder="user-login"
                errors={form.formState.errors}
                required
            >Логин</Input>
            <Input
                {...form.register('email')}
                id="email"
                type="email"
                placeholder="user@email.adress"
                errors={form.formState.errors}
                required
            >Электронная почта</Input>
            <Input
                {...form.register('password')}
                id="password"
                type="password"
                placeholder="password"
                errors={form.formState.errors}
                required
            >Пароль</Input>
            <Input
                {...form.register('repeat_password')}
                id="repeat_password"
                type="password"
                placeholder="password"
                errors={form.formState.errors}
                required
            >Повторите пароль</Input>
            <Input
                {...form.register('agreement')}
                id="agreement"
                type="checkbox"
                errors={form.formState.errors}
                required
            >
                <span>Я согласен с <Link to="/">Условиями использования</Link> и <Link to="/">Политикой конфиденциальности</Link></span>
            </Input>
            <Button text="Зарегистрироваться" type="submit"/>
        </AuthForm>
    );
};
