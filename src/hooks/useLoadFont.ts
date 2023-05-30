import { useEffect, useState } from 'react';

import {
  Raleway_400Regular,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import * as Font from 'expo-font';

function useLoadFont(prevent: Promise<boolean>) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await prevent;
        await Font.loadAsync({
          Raleway_400Regular,
          Raleway_700Bold,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return {
    appIsReady,
  };
}
export default useLoadFont;
