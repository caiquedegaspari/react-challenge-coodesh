import React, { useContext, useState } from 'react';

import {
	Box,
	Button,
	Modal,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { Radio } from '../../../models/Radio';
import { theme } from '../../../styles/theme';
import { RadioContext } from '../../../contexts/RadioContext';
import { removeRadios, saveRadios } from '../../../utils/localStorageFunctions';
import { toast } from 'react-toastify';

interface UpdateRadioModalProps {
	radio?: Radio;
	isOpen: boolean;
	handleClose(): void;
}

export function UpdateRadioModal({
	handleClose,
	isOpen,
	radio,
}: UpdateRadioModalProps) {
	const { favoriteRadios, setFavoriteRadio } = useContext(RadioContext);

	const [radioName, setRadioName] = useState('');
	const [radioDescription, setRadioDescription] = useState('');

	const closeModal = () => {
		setRadioName('');
		setRadioDescription('');
		handleClose();
	};

	const handleEdit = () => {
		if (!radio) return;
		const idxToUpdate = favoriteRadios.indexOf(radio);
		const { name, description, ...rest } = radio;
		if (!radioName && !radioDescription) {
			toast.error('Insira um nome ou descrição');
			return;
		}
		favoriteRadios.splice(idxToUpdate, 1, {
			...rest,
			name: radioName.length > 0 ? radioName : radio.name,
			description:
				radioDescription.length > 0 ? radioDescription : radio.description,
		});
		removeRadios();
		setFavoriteRadio(favoriteRadios);
		saveRadios(JSON.stringify(favoriteRadios));
		closeModal();
	};

	const isDesktop = useMediaQuery('(min-width: 600px)');

	return (
		<Modal open={isOpen} onClose={handleClose}>
			<Box
				position="absolute"
				sx={{
					background: theme.palette.primary.main,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					borderRadius: '8px',
				}}
				width={isDesktop ? '500px' : '90%'}
				height="400px"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				alignItems="flex-end"
				padding={2}
			>
				<Typography
					alignSelf="center"
					color="background.paper"
					fontSize="22px"
					fontWeight={600}
				>
					Update your favorite radio name and description
				</Typography>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="space-around"
					width="100%"
					minHeight="40%"
				>
					<TextField
						onChange={(evt) => setRadioName(evt.target.value)}
						value={radioName}
						placeholder="Type the new name here"
						InputProps={{
							sx: { background: theme.palette.background.paper },
						}}
					/>
					<TextField
						onChange={(evt) => setRadioDescription(evt.target.value)}
						value={radioDescription}
						placeholder="Type the new description here"
						InputProps={{
							sx: { background: theme.palette.background.paper },
						}}
					/>
				</Box>

				<Button
					onClick={handleEdit}
					color="info"
					sx={{ background: theme.palette.secondary.main }}
				>
					Update
				</Button>
			</Box>
		</Modal>
	);
}
