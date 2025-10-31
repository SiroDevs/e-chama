import { blue, grey } from '@mui/material/colors';

export const GLOBAL_STYLES = {
  html: {
    height: '100%',
    WebkitTextSizeAdjust: '100%',
    MsTextSizeAdjust: '100%',
    WebkitTapHighlightColor: 'transparent',
  },
  
  body: { 
    margin: 4,
    height: '100%',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    touchAction: 'manipulation',
    overscrollBehavior: 'none',
  },
  
  '#__next': {
    height: '100%',
  },
  
  '.page-title': { color: 'darkblue' },
  '.page-subtitle': { color: grey[600] },
  a: {
    textDecoration: 'underline',
    textDecorationColor: blue[800],
    color: blue['700'],
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.8',
    letterSpacing: '0.00938em',
  },
  
  'input, textarea, select': {
    fontSize: '16px !important',
  },
  
  '.no-select': {
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
  },
  
  button: {
    minHeight: '44px',
    minWidth: '44px',
  },
};