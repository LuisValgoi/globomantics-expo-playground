import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { PropsWithChildren } from 'react';

const Theme: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = extendTheme({
    fontConfig: {
      Raleway: {
        400: {
          normal: 'Raleway_400Regular',
          bold: 'Raleway_700Bold',
        },
      },
    },
    fonts: {
      body: 'Raleway',
    },
    components: {
      Button: {
        baseStyle: {
          rounded: 'full',
        },
        defaultProps: {
          fontColor: 'white',
          colorScheme: 'red',
        },
      },
      Input: {
        baseStyle: {
          rounded: 'full',
        },
      },
      Text: {
        defaultProps: {
          fontFamily: 'body',
          fontWeight: 400,
        },
      },
      Checkbox: {
        defaultProps: {
          colorScheme: 'red',
        },
      },
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export default Theme;
