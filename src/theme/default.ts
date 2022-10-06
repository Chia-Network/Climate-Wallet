import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grey: true
  }
}

declare module '@mui/material' {
  interface Color {
    main: string
    dark: string
  }
}

const defaultTheme = {
  palette: {
    primary: {
      main: '#67B167',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#67B167',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    background: {
      default: '#f8f9fa',
    },
    other: {
      border: '#BDBDBD',
      lightBackground: '#EDF6ED',
      lightBadgeRequesting: '#EF7B1B',
      buttonTextGreen: '#439643',
      buttonContainer: '#67B167',
      infoBackground: '#E6F3FA',
      disabledBackground: '#E0E0E0',
    },
  },
}

const theme = createTheme(defaultTheme)

export default deepmerge(defaultTheme, {
  drawer: {
    width: '72px',
  },
  mixins: {
    toolbar: {
      minHeight: '90px',
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h6' },
          style: {
            fontWeight: 400,
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontWeight: 500,
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            color: theme.palette.text.secondary,
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'text' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette['other'].buttonTextGreen,
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: theme.palette['other'].buttonContainer,
            '&.Mui-disabled': {
              backgroundColor: theme.palette['other'].disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            paddingTop: 1,
            paddingBottom: 1,
            textTransform: 'none', // NOTE : prevent default upper case
            fontWeight: '500',
            color: theme.palette['other'].buttonTextGreen,
            borderColor: theme.palette.secondary.main,
            '&.Mui-disabled': {
              border: `1px solid ${theme.palette['other'].disabledBackground}`,
            },
            '&:hover': {
              borderColor: '#528E52',
              backgroundColor: theme.palette['other'].lightBackground,
            },
          },
        },
      ],
    },
  },
})
