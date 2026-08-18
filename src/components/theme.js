import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBackground: '#e1e4e8',
    white: '#ffffff',
  },
  fontFamily: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    default: 'System',
  }),
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;