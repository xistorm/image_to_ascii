

export type User = {
	id: string;
	login: string;
	email: string;
};

export type AuthState = {
	user?: User
	token?: string;
};
