import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'src/interfaces/interfaces';
import PrivateStackNavigator from './PrivateStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';
import Footer from 'src/components/_application_/Footer/Footer';
import { useAuth } from 'src/hooks/useAuth';

const Stack = createStackNavigator<RootStackParamList>();

type StackNavigatorProps = {
  onLayoutRootView: () => Promise<void>;
};

const StackNavigator: React.FC<StackNavigatorProps> = ({
  onLayoutRootView,
}) => {
  const { user } = useAuth();

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName={user?.displayName ? 'News' : 'SignIn'}>
        {PublicStackNavigator({ Stack })}
        {PrivateStackNavigator({ Stack })}
      </Stack.Navigator>
      {user?.displayName && <Footer />}
    </NavigationContainer>
  );
};

export default StackNavigator;
