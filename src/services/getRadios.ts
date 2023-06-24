import axios from 'axios';
import { Radio } from '../models/Radio';
import { enviromentVariables } from '../config/env';
interface SearchParams {
	searchValue?: string;
	searchBy?: string;
	offset?: number;
}

const { apiURL } = enviromentVariables;

const convertStringToQueryParam = (string?: string, filterType?: string) => {
	const search = string?.split(' ');
	const parsed = search?.map((item, idx) => {
		if (idx + 1 < search.length) return `${item}%20`;
		return item;
	});
	const parsedSearch = parsed?.toString().replace(',', '');
	const searchString =
		filterType && parsedSearch ? `${filterType}=${parsedSearch}&` : '';
	return searchString;
};

export const getRadios = async ({
	offset,
	searchBy,
	searchValue,
}: SearchParams) => {
	const searchString = convertStringToQueryParam(searchValue, searchBy);

	const res = await axios.get<Radio[]>(
		`${apiURL}stations/search?${searchString}limit=10&offset=${
			offset ?? ''
		}&hidebroken=true`
	);

	const radios: Radio[] = res.data;
	return radios;
};
