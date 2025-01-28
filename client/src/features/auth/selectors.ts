import { useAppSelector } from '@/app/hooks';


export const useAuthSelector = () => useAppSelector(state => state.auth);
