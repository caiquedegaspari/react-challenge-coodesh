import { createContext } from 'react';
import { Radio } from '../models/Radio';

interface RadioContextTypes {
	favoriteRadios: Radio[];
	radios: Radio[];
	setRadio(value: Radio[]): void;
	setFavoriteRadio(value: Radio[]): void;
}

const defaultValues = {
	radios: [],
	favoriteRadios: [],
	setRadio: () => {
		return;
	},
	setFavoriteRadio: () => {
		return;
	},
};

export const RadioContext = createContext<RadioContextTypes>(defaultValues);
