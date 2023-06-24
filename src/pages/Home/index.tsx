import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { Sidebar } from '../../components/SideBar';
import { FavoriteRadioList } from '../../components/FavoriteRadioList';
import { RadioContext } from '../../contexts/RadioContext';
import { Radio } from '../../models/Radio';
import { getRadios } from '../../services/getRadios';
import { getStorageRadios } from '../../utils/localStorageFunctions';

export function Home() {
	const [radios, setRadios] = useState<Radio[]>([]);
	const [favorites, setFavorites] = useState<Radio[]>([]);
	const [loadedFavorite, setLoadedFavorites] = useState<Radio[]>([]);
	const set = (value: Radio[]) => {
		setRadios(value);
	};

	useEffect(() => {
		const fromStorage = getStorageRadios();
		if (!fromStorage) return;
		const parsed: Radio[] = JSON.parse(fromStorage) as Radio[];
		setFavorites(parsed);
		setLoadedFavorites(parsed);
	}, []);

	const load = async () => {
		const response = await getRadios({});
		if (favorites)
			favorites.forEach((favorite) => {
				response.map((res) => {
					if (res.stationuuid === favorite.stationuuid) {
						res.isFavorite = true;
					}
				});
			});
		setRadios(response);
	};

	useEffect(() => {
		load();
	}, [loadedFavorite]);

	return (
		<RadioContext.Provider
			value={{
				radios: [...radios],
				favoriteRadios: [...favorites],
				setRadio: set,
				setFavoriteRadio: setFavorites,
			}}
		>
			<Grid container xs={12} minHeight="100vh">
				<Grid item xs={0} md={4} zIndex={1}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={7} zIndex={0}>
					<Typography fontSize="42px" color="secondary" fontWeight={500}>
						Radio Browser
					</Typography>
					<FavoriteRadioList />
				</Grid>
			</Grid>
		</RadioContext.Provider>
	);
}
