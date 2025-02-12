export const bufferToURI = (type: string, content: string) => {
	return `data:${type};base64,${content}`;
};
