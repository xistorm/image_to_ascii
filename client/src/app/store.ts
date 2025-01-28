import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/slice';

export const store = configureStore({
	reducer: {
		'auth': authReducer,
	},
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
