import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Drawer,
	FormControl,
	FormHelperText,
	IconButton,
	MenuItem,
	Pagination,
	Select,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';

import { RadioListItem } from '../RadioListItem';
import { theme } from '../../styles/theme';
import { RadioContext } from '../../contexts/RadioContext';
import { Radio } from '../../models/Radio';
import { getRadios } from '../../services/getRadios';
import { getRadiosCount } from '../../services/getRadiosCount';
import { saveRadios } from '../../utils/localStorageFunctions';
import { ArrowBackRounded } from '@mui/icons-material';

type FilterTypes = 'name' | 'country' | 'language';

export function Sidebar() {
	const { radios, setRadio, setFavoriteRadio, favoriteRadios } =
		useContext(RadioContext);

	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const [filter, setFilter] = useState<FilterTypes>('name');
	const [searchValue, setSearchValue] = useState('');
	const [countStations, setCountStations] = useState(0);
	const [page, setPage] = useState(1);

	const load = async (sendParams?: boolean) => {
		if (sendParams) {
			const searchedRadios = await getRadios({
				searchValue,
				searchBy: filter,
				offset: page === 1 ? 0 : page * 10 - 10,
			});
			setRadio(searchedRadios);
		} else {
			const searchedRadios = await getRadios({
				offset: page === 1 ? 0 : page * 10 - 10,
			});
			setRadio(searchedRadios);
		}
	};

	useEffect(() => {
		if (searchValue.length > 1 && filter) {
			load(true);
		} else load();
	}, [searchValue, page]);

	const loadAllStationsCount = async (): Promise<void> => {
		const count = await getRadiosCount();
		setCountStations(count);
	};

	useEffect(() => {
		loadAllStationsCount();
	}, []);

	const addFavoriteRadio = (radio: Radio) => {
		const isAlreadyFavorite = favoriteRadios.some(
			(value) => value.stationuuid === radio.stationuuid
		);
		if (!isAlreadyFavorite) {
			const newFavorites = [...favoriteRadios, radio];
			setFavoriteRadio(newFavorites);
			saveRadios(JSON.stringify(newFavorites));
		}
	};

	const handleSelectFilter = (value: string) => {
		setFilter(value as FilterTypes);
	};

	const handleChangePage = (value: number) => {
		setPage(value);
	};

	const isDesktopScreen = useMediaQuery('(min-width: 950px)');
	const heightBiggerThan750px = useMediaQuery('(min-height: 750px)');

	useEffect(() => {
		if (isDesktopScreen) setIsDrawerOpen(true);
		else setIsDrawerOpen(false);
	}, [isDesktopScreen]);

	const menuItems = ['name', 'country', 'language'];

	return (
		<>
			<Button
				sx={{ background: theme.palette.secondary.main }}
				color="info"
				onClick={() => setIsDrawerOpen(true)}
			>
				Open Sidebar
			</Button>
			<Drawer
				variant={isDesktopScreen ? 'persistent' : 'temporary'}
				anchor="left"
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				sx={{ overflowX: 'hidden' }}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch',
						justifyContent: 'space-around',
						background: theme.palette.secondary.dark,
						minHeight: heightBiggerThan750px ? '100%' : '850px',
						overflowX: 'hidden',
						maxWidth: isDesktopScreen ? '360px' : '400px',
					}}
				>
					{!isDesktopScreen ? (
						<Box>
							<IconButton
								sx={{ alignSelf: 'flex-end' }}
								onClick={() => setIsDrawerOpen(false)}
							>
								<ArrowBackRounded />
							</IconButton>
						</Box>
					) : null}

					<Box
						width="100%"
						display="flex"
						justifyContent="space-around"
						alignItems="center"
						sx={{ padding: '5px' }}
					>
						<TextField
							onChange={(evt) => setSearchValue(evt.target.value)}
							value={searchValue}
							placeholder="Search Here"
							InputProps={{
								sx: { background: theme.palette.background.paper },
							}}
						/>
						<Box>
							<FormControl
								sx={{
									margin: '0 20px',
									marginTop: '20px',
								}}
							>
								<Select
									value={filter}
									color="primary"
									inputProps={{
										sx: {
											background: theme.palette.background.paper,
											width: '100px',
										},
									}}
								>
									{menuItems.map((element, idx) => (
										<MenuItem
											key={idx}
											value={element}
											onClick={() => handleSelectFilter(element)}
										>
											{element}
										</MenuItem>
									))}
								</Select>
								<FormHelperText sx={{ color: theme.palette.background.paper }}>
									Filter By {filter.toString()}
								</FormHelperText>
							</FormControl>
						</Box>
					</Box>

					<Box height="100%">
						{radios.length > 0 ? (
							radios.map((radio, index) => (
								<Box maxWidth="98%" paddingX={1} marginY={1} key={index}>
									<RadioListItem
										isFavorite={favoriteRadios.some(
											(el) => el.stationuuid === radio.stationuuid
										)}
										name={radio?.name}
										onClick={() => addFavoriteRadio(radio)}
									/>
								</Box>
							))
						) : page > 1 ? (
							<Box width="100%" textAlign="center">
								<Typography
									color="background.paper"
									fontSize="22px"
									fontWeight={600}
								>
									Radio not found in this page
								</Typography>
							</Box>
						) : (
							<Box width="100%" textAlign="center">
								<Typography
									color="background.paper"
									fontSize="22px"
									fontWeight={600}
								>
									Radio not found
								</Typography>
							</Box>
						)}
					</Box>

					<Pagination
						sx={{
							alignSelf: 'center',
							'.MuiPagination-ul': {
								button: {
									color: 'white',
									fontWeight: '500',
								},
							},
						}}
						size="medium"
						color="secondary"
						shape="rounded"
						onChange={(_, currentPage) => handleChangePage(currentPage)}
						page={page}
						count={Math.floor(countStations / 10) - 1}
					/>
				</Box>
			</Drawer>
		</>
	);
}
