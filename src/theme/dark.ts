import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import theme from './default';

export default createTheme(
  deepmerge(theme, {
    palette: {
      background: {
        default: '#1C2128',
        paper: '#22272D',
      },
      secondary: {
        main: '#4876AF',
        contrastText: '#000000',
      },
      mode: 'dark',
    },
  })
);
