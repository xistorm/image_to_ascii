import { getLsValue, removeLsValue, setLsValue } from '@/shared/utils';

const LS_TOKEN_KEY = 'user.auth.token';

export const getAuthToken = () => getLsValue<string>(LS_TOKEN_KEY, '');

export const setAuthToken = (token: string) => setLsValue(LS_TOKEN_KEY, token);

export const removeAuthToken = () => removeLsValue(LS_TOKEN_KEY);
