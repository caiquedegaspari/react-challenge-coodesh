import axios from 'axios';
import { enviromentVariables } from '../config/env';

const { apiURL } = enviromentVariables;

interface GetRadiosCountReturn {
	stations: number;
}

export const getRadiosCount = async () => {
	const res = await axios.get<GetRadiosCountReturn>(`${apiURL}stats`);
	return res.data.stations;
};
