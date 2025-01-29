const LS_KEY = 'token';

export const getToken = () => {
	return localStorage.getItem(LS_KEY) || undefined;
};

export const setToken = (token: string) => {
	localStorage.setItem(LS_KEY, token);
};

export const isToken = () => {
	const token = localStorage.getItem(LS_KEY);

	return Boolean(token);
};
