import { UserForm } from '@/widgets';
import type { FC } from 'react';

export const Registration: FC = () => {
    return (
        <UserForm
            title="Регистрация"
            description="Создайте аккаунт, чтобы конвертировать фотографии в ASCII-арт и управлять результатами в терминале."
            items={[
                {
                    id: 'login',
                    name: 'login',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                    placeholder: 'user-login',
                },
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Электронная почта',
                    required: true,
                    placeholder: 'user@mail.adress',
                },
                {
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    label: 'Пароль',
                    required: true,
                    placeholder: 'password',
                },
                {
                    id: 'check_password',
                    name: 'check_password',
                    type: 'password',
                    label: 'Повторите пароль',
                    required: true,
                    placeholder: 'password',
                },
            ]}
            submit="Зарегистрироваться"
            redirect={{
                description: 'Уже есть аккаунт?',
                text: 'Войти',
                to: '/login',
            }}
        />
    );
};
