import { useState } from 'react';


type RequestCallback<T> = (data: T) => void;

export const useForm = <T extends object>(initialValue: T, requestCallback: RequestCallback<T>) => {
	const [data, setData] = useState<T>(initialValue);

	const handleChange = (input: HTMLInputElement) => {
		const { name, value } = input;

		if (!(name in data)) {
			return;
		}

		setData((curr) => ({ ...curr, [name]: value }));
	};

	const handleSubmit = async () => {
		requestCallback(data);
	};

	return [data, handleChange, handleSubmit] as const;
};
