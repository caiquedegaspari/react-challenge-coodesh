import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Grid, Typography, useMediaQuery } from '@mui/material';
import { Radio as RadioIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { FavoriteRadioItem } from '../FavoriteRadioItem';
import { theme } from '../../styles/theme';
import { RadioContext } from '../../contexts/RadioContext';
import { Radio } from '../../models/Radio';
import { UpdateRadioModal } from '../modals/UpdateRadio';
import { removeRadios, saveRadios } from '../../utils/localStorageFunctions';

export function FavoriteRadioList() {
	const { radios, setRadio, favoriteRadios, setFavoriteRadio } =
		useContext(RadioContext);

	const [audio] = useState(new Audio());
	const [currentRadio, setCurrentRadio] = useState<Radio | null>();
	const [loading, setLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleCloseModal = () => setIsModalOpen(false);

	const favorites = useMemo(() => {
		return favoriteRadios;
	}, [favoriteRadios]);

	useEffect(() => {
		audio.addEventListener('playing', () => {
			setLoading(false);
			setIsPlaying(true);
		});
		audio.addEventListener('play', () => {
			setLoading(true);
		});
		audio.addEventListener('pause', () => {
			setLoading(false);
			setIsPlaying(false);
		});
	}, [audio, currentRadio]);

	const handlePlay = (radio: Radio) => {
		audio.src = radio.url;
		audio.play().then(
			() => setCurrentRadio(radio),
			() => {
				toast.warn('Could not reproduce this station');
				setCurrentRadio(null);
				audio.pause();
			}
		);
	};

	const handlePause = () => {
		audio.pause();
		setCurrentRadio(null);
	};

	const handleOpenEditModal = (radio: Radio) => {
		audio.pause();
		setCurrentRadio(radio);
		setIsModalOpen(true);
	};

	const handleDelete = (radioToDelete: Radio) => {
		if (currentRadio?.stationuuid === radioToDelete.stationuuid) handlePause();

		const idxToDelete = favoriteRadios.indexOf(radioToDelete);
		favoriteRadios.splice(idxToDelete, 1);

		radios.map((radio) => {
			if (radio.stationuuid === radioToDelete.stationuuid) {
				radio.isFavorite = false;
			}
		});
		setRadio(radios);
		setFavoriteRadio(favoriteRadios);
		removeRadios();
		saveRadios(JSON.stringify(favoriteRadios));
	};

	const matches = useMediaQuery('(min-width: 600px)');

	return (
		<Grid
			borderRadius={1}
			padding={1}
			minHeight="600px"
			bgcolor={theme.palette.secondary.dark}
			container
			xs={12}
			gap={2}
			sx={{
				boxShadow: '2px 3px 3px 2px rgba(0, 0, 0, 0.274)',
			}}
		>
			<Grid
				item
				xs={12}
				padding={2}
				borderBottom="2px solid"
				borderColor={theme.palette.secondary.main}
				maxHeight="90px"
			>
				<Typography
					textOverflow="ellipsis"
					overflow="hidden"
					whiteSpace="nowrap"
					fontSize={matches ? '38px' : '24px'}
					color="background.paper"
					fontWeight={500}
				>
					<RadioIcon
						fontSize={matches ? 'large' : 'medium'}
						sx={{ color: theme.palette.primary.light, margin: '0 10px' }}
					/>
					{currentRadio?.name ?? 'Play some music!'}
				</Typography>
			</Grid>
			{favorites.length > 0 ? (
				favorites?.map((radio, index) => (
					<Grid key={index} item xs={12}>
						<FavoriteRadioItem
							desktopScreen={matches}
							loading={loading}
							handlePause={handlePause}
							handlePlay={() => handlePlay(radio)}
							isPlaying={
								currentRadio?.stationuuid === radio.stationuuid && isPlaying
							}
							onEdit={() => handleOpenEditModal(radio)}
							onDelete={() => handleDelete(radio)}
							name={radio?.name}
							description={`${radio.country}. ${radio?.description ?? ''}`}
						/>
					</Grid>
				))
			) : (
				<Grid item xs={12} display="flex" justifyContent="center">
					<Typography fontSize="38px" color="background.paper" fontWeight={500}>
						Choose at least one favorite Radio
					</Typography>
				</Grid>
			)}
			<UpdateRadioModal
				handleClose={handleCloseModal}
				isOpen={isModalOpen}
				radio={currentRadio ?? undefined}
			/>
		</Grid>
	);
}
