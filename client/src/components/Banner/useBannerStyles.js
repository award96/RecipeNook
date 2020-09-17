import {fade, makeStyles} from '@material-ui/core/styles'

const useBannerStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },
    root: {},
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuTitle: {
      display: 'block',
      paddingLeft: 5,
      color: theme.palette.menu.title,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 50,
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.2),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    logInContainer: {
      transform: 'translateY(5%)',
    },
    logInIconContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: '40%',
    },
    logInButtonContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 0,
      height: '50%',
    },

    logInIcon: {
      position: 'relative',
      transform: 'translateY(25%)',
    },
    circleIconGrid: {
      position: 'relative',
      transform: 'translateX(-50%)',
    },
    createRecipeContainer: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: '15vw',
      },
    },
    createRecipeGridText: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 0,
      marginBottom: 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '5vw',
      },
    },
    createRecipeGridButton: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
    createRecipe: {
      display: 'flex',
      justifyItems: 'flex-start',
      marginLeft: 0,
    },
    addCircle: {
      color: theme.palette.white.main,
    },
    createRecipeText: {
      alignSelf: 'center',
      color: theme.palette.linkText.main,
    },
    logInButton: {
      color: theme.palette.linkText.main,
    },
    createContainer: {
      marginLeft: 0,
      WebkitTransform: 'translate(0%,15%)',
      msTransform: 'translate(0%,15%)',
    },
    create: {
      position: 'relative',
      alignItems: 'center',
      margin: 'auto',
      backgroundColor: theme.palette.white.main,
    },
    createText: {
      color: theme.palette.black.light,
      textTransform: 'uppercase',
      lineHeight: '125%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.menu.title,
    },
    inputRoot: {
      color: theme.palette.menu.title,
      minWidth: '18rem',
      [theme.breakpoints.up('xs')]: {
        minWidth: '4rem',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    menu: {
      justifyContent: 'center',
    },
    notifMenu: {
      minHeight: '40rem',
      maxHeight: '120rem',
    },
    searchMenu: {
      width: '18rem',
      maxWidth: '18rem',
      backgroundColor: 'white',
      zIndex: 2,
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '1px 1px #CACACA',
      [theme.breakpoints.up('xs')]: {
        minWidth: '4rem',
      },
    },
    menuItem: {
      width: '20ch',
      [theme.breakpoints.up('xs')]: {
        minWidth: '4rem',
      },
    },
    searchMenuItem: {
      width: '18rem',
    },
    readMenuItem: {
      width: '20ch',
      color: theme.palette.text.disabled,
    },
    menuAvatar: {
      justifySelf: 'center',
    },
    messages: {
      color: theme.palette.menu.icon,
    },
    sectionDesktop: {
      color: theme.palette.menu.icon,
      display: 'flex',
    },
  }
})
export default useBannerStyles
