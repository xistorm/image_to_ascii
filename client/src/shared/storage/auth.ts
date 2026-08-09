import { createLsStorage } from '@/shared/utils';

const LS_TOKEN_KEY = 'user.auth.token';

export const authStorage = createLsStorage(LS_TOKEN_KEY, '');
