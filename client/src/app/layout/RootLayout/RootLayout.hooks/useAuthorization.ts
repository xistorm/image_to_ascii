import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useStore } from '@nanostores/react';

import { $isAuthenticated, getAuthorizeQueryOptions, login, logout } from '@/entities/user';

export const useAuthorization = () => {
    const navigate = useNavigate();
    const isAuthenticated = useStore($isAuthenticated);
    const { data, isLoading } = useQuery(getAuthorizeQueryOptions());

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (data) {
            login(data);
        } else {
            logout();
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isAuthenticated) {
            navigate({ to: '/gallery' });
        } else {
            navigate({ to: '/login' });
        }
    }, [isLoading, isAuthenticated, navigate]);

    return isLoading;
};
