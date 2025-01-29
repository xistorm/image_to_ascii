import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/app/hooks';
import { User } from '@services/auth/types';


type AuthState = {
	user?: User;
};

const initialState: AuthState = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		'login': (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		'logout': (state) => {
			state.user = undefined;
		},
	},
});

export const useAuthSelector = () => useAppSelector(state => state.auth);
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
