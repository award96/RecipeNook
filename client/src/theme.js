import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      // orange
      main: '#F18D2E',
    },
    secondary: {
      // gray
      main: '#676767',
    },
    black: {
      main: '#000000',
      light: '#676767',
    },
    white: {
      main: '#f5f5f5',
      offWhite: '#F0F0F0',
      dark: '#C0C0C0',
    },
    menu: {
      title: '#ffffff',
      icon: '#f5f5f5',
    },
    footer: {
      main: '#5D5B57',
    },
    linkText: {
      // whitesmoke
      main: '#f5f5f5',
      about: '#0049B7',
    },
    userBanner: {
      main: '#D0A985',
      secondary: '#987A5E',
    },
  },
  typography: {
    caption: {
      fontSize: 10,
    },
  },
})

export default theme
