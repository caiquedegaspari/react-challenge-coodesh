export interface Radio {
	name?: string | 'Name not found';
	country: string;
	url: string;
	stationuuid: string;
	countrycode?: string;
	state?: string;
	tags?: string;
	isFavorite?: boolean;
	description?: string;
}
