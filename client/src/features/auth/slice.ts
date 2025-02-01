import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/app/hooks';
import { User } from '@services/auth/types';


type AuthState = {
	user?: User;
	isLoading: boolean;
	isAuthorized: boolean;
};

const initialState: AuthState = {
	isLoading: true,
	isAuthorized: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		'login': (state, action: PayloadAction<User>) => {
			const user = action.payload;

			state.user = user;
			state.isAuthorized = Boolean(user);
			state.isLoading = false;
		},
		'logout': (state) => {
			state.user = undefined;
			state.isAuthorized = false;
			state.isLoading = false;
		},
	},
});

export const useAuthSelector = () => useAppSelector(state => state.auth);
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
