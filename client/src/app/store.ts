import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/slice';
import fileReducer from '@features/file/slice';
import { apiMiddleware, apiReducer } from '@services';

export const store = configureStore({
	reducer: {
		...apiReducer,
		'auth': authReducer,
		'file': fileReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
