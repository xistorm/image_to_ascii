import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types.ts';


const initialState: AuthState = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		'login': (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		'logout': (state) => {
			state.user = undefined;
			state.token = undefined;
		}
	}
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
