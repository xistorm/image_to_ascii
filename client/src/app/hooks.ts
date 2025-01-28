import { AppDispatch, RootState } from './store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useDispatch.withTypes<RootState>();
