import 'react-native-gesture-handler';
import React from 'react';

import Bootstrap from 'src/providers/Bootstrap';
import Theme from 'src/providers/Theme';
import StackNavigator from 'src/navigator/StackNavigator';
import AppProvider from 'src/providers/App';
import AuthProvider from 'src/providers/Auth';

export default function App() {
  return (
    <Theme>
      <Bootstrap>
        {({ onLayoutRootView }) => (
          <AppProvider>
            <AuthProvider>
              <StackNavigator onLayoutRootView={onLayoutRootView} />
            </AuthProvider>
          </AppProvider>
        )}
      </Bootstrap>
    </Theme>
  );
}
