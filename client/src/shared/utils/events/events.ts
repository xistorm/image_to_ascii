import { SyntheticEvent } from 'react';

export type Effect<T = void, R = void> = (value: T) => R;

export const cancelEvent = (event: SyntheticEvent | Event) => {
	event.preventDefault();
	event.stopPropagation();

	return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const noop = (..._args: any[]): any => {
};
