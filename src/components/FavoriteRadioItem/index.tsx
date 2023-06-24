import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { theme } from '../../styles/theme';
import { Delete, Edit, Pause, PlayArrow } from '@mui/icons-material';

interface FavoriteRadioItemProps {
	name?: string;
	description: string;
	onEdit(): void;
	onDelete(): void;
	handlePlay(): void;
	handlePause(): void;
	isPlaying: boolean;
	loading: boolean;
	desktopScreen: boolean;
}

export function FavoriteRadioItem({
	name,
	description,
	onEdit,
	onDelete,
	handlePlay,
	isPlaying,
	handlePause,
	loading,
	desktopScreen,
}: FavoriteRadioItemProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: '75px',
					background: theme.palette.info.main,
					display: 'flex',
					alignItems: 'center',
					justifyContent: desktopScreen ? 'space-between' : '',
				}}
				borderRadius={1}
			>
				{isPlaying ? (
					<IconButton disabled={loading} onClick={handlePause}>
						<Pause />
					</IconButton>
				) : (
					<IconButton disabled={loading} onClick={handlePlay}>
						<PlayArrow />
					</IconButton>
				)}
				<Box width={desktopScreen ? '85%' : '65%'}>
					<Typography
						width="90%"
						color="background.paper"
						overflow="hidden"
						textOverflow="ellipsis"
						whiteSpace="nowrap"
						fontSize={desktopScreen ? '28px' : '18px'}
						fontWeight={600}
					>
						{name === '' ? 'Name not found' : name}
					</Typography>
					<Typography
						overflow="hidden"
						textOverflow="ellipsis"
						whiteSpace="nowrap"
						color="background.paper"
						fontSize="16px"
						fontWeight={500}
					>
						{description}
					</Typography>
				</Box>
				<IconButton onClick={onEdit}>
					<Edit />
				</IconButton>
				<IconButton onClick={onDelete}>
					<Delete />
				</IconButton>
			</Box>
		</Box>
	);
}
