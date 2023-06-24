import React from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../styles/theme';
import { CheckCircleOutline } from '@mui/icons-material';

interface RadioListItemProps {
	name?: string;
	onClick: () => void;
	isFavorite?: boolean;
}

export function RadioListItem({
	name,
	onClick,
	isFavorite,
}: RadioListItemProps) {
	return (
		<Box
			maxWidth="100%"
			height="55px"
			sx={{
				background: theme.palette.info.main,
				'&:hover': { background: theme.palette.primary.main },
				transition: '200ms',
				cursor: 'pointer',
			}}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			borderRadius={1}
			paddingX={1}
			onClick={onClick}
		>
			<Typography
				color="background.paper"
				fontSize="18px"
				fontWeight={600}
				overflow="hidden"
				textOverflow="ellipsis"
				whiteSpace="nowrap"
			>
				{name === '' ? 'Name not found' : name}
			</Typography>
			{isFavorite && <CheckCircleOutline color="secondary" />}
		</Box>
	);
}
