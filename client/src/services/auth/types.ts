export type User = {
	id: string;
	login: string;
	email: string;
	password: string;
};

export type LoginRequest = Pick<User, 'login' | 'password'>

export type AuthResponse = {
	token: string;
};
