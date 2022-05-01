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
            main: '#e0e0e0',
            light: '#ffffff',
            dark: '#aeaeae',
            contrastText: '#000000',
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