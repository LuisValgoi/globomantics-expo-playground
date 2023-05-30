import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ComponentProps } from 'src/interfaces/interfaces';
import { Button, HStack } from 'native-base';

const Footer: React.FC = () => {
  const navigation = useNavigation<ComponentProps<'News'>>();

  return (
    <HStack
      w="full"
      space="2"
      pt="3"
      pb="6"
      justifyItems="center"
      alignItems="center"
      justifyContent="center"
      bgColor="red.500"
    >
      <Button variant="solid" onPress={() => navigation.navigate('News', {})}>
        News
      </Button>
      <Button variant="solid" onPress={() => navigation.navigate('About', {})}>
        About
      </Button>
    </HStack>
  );
};

export default Footer;
