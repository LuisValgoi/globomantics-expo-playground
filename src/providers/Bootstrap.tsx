import 'react-native-gesture-handler';
import React, { ReactNode } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import useLoadFont from 'src/hooks/useLoadFont';

SplashScreen.preventAutoHideAsync();

const Bootstrap = ({
  children,
}: {
  children(options: { onLayoutRootView: () => Promise<void> }): ReactNode;
}) => {
  const { appIsReady } = useLoadFont(SplashScreen.preventAutoHideAsync());

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }

  return <>{children({ onLayoutRootView })}</>;
};

export default Bootstrap;
