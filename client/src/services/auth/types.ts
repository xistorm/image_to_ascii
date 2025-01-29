export type User = {
	id: string;
	login: string;
	email: string;
	password: string;
};

export type LoginRequest = {
	login: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};
