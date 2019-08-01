import React from 'react';

import { AuthProvider } from './auth/Auth';
import { AppRouter } from './router/AppRouter';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, deepOrange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import { NotesProvider } from './notes/NotesProvider';

const theme = createMuiTheme({
	palette: {
	  primary: indigo,
	  secondary: deepOrange,
	},
	status: {
	  danger: 'orange',
	},
});

export class App extends React.Component {

	componentDidMount() {
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<NotesProvider>
						<AppRouter />
					</NotesProvider>
				</AuthProvider>
			</ThemeProvider>
		);
	}
}

