import * as React from 'react';
import Header from 'src/components/_application_/Header/Header';
import { StackNavigatorProps } from 'src/interfaces/interfaces';

import About from 'src/screens/About';
import NewsCreate from 'src/screens/NewsCreate';
import NewsEdit from 'src/screens/NewsEdit';
import News from 'src/screens/News';
import NewsDetail from 'src/screens/NewsDetail';

const PrivateStackNavigator: React.FC<StackNavigatorProps> = ({ Stack }) => {
  return (
    <>
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: () => <Header display="News" />,
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{
          header: () => <Header display="Details" />,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          header: () => <Header display="About" />,
        }}
      />
      <Stack.Screen
        name="NewsCreate"
        component={NewsCreate}
        options={{
          header: () => <Header display="News Create" />,
        }}
      />
      <Stack.Screen
        name="NewsEdit"
        component={NewsEdit}
        options={{
          header: () => <Header display="News Edit" />,
        }}
      />
    </>
  );
};

export default PrivateStackNavigator;
