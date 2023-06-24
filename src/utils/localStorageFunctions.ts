const radioKey = 'Favorite_Radios';

const saveRadios = (value: string) => {
	localStorage.setItem(radioKey, value);
};

const getStorageRadios = (): string | null => {
	return localStorage.getItem(radioKey);
};

const removeRadios = () => {
	localStorage.removeItem(radioKey);
};

export { getStorageRadios, removeRadios, saveRadios };
