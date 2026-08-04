import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAuthorizeQueryOptions, login, logout } from '@/entities/user';

export const useAuthorization = () => {
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

    return isLoading;
};
