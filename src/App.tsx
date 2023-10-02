import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { Home } from './pages/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ToastContainer />
			<Box
				sx={{
					background: `linear-gradient(${theme.palette.background.default},${theme.palette.background.paper})`,
				}}
				position="absolute"
				minHeight="100%"
				width="100%"
			>
				<Home />
			</Box>
		</ThemeProvider>
	);
}

export default App;
