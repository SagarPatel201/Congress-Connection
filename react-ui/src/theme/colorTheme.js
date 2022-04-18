import {createTheme} from "@mui/material/styles"

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#424242',
            light: '#6d6d6d',
            dark: '#1b1b1b',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#ff9800',
            light: '#a4a4a4',
            dark: '#494949',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#ffffff'
                },
            }
        }
    },
    spacing: 4,
})