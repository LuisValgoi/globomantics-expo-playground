import * as React from 'react';
import { StackNavigatorProps } from 'src/interfaces/interfaces';

import SignUp from 'src/screens/SignUp';
import SignIn from 'src/screens/SignIn';

const PublicStackNavigator: React.FC<StackNavigatorProps> = ({ Stack }) => {
  return (
    <>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </>
  );
};

export default PublicStackNavigator;
