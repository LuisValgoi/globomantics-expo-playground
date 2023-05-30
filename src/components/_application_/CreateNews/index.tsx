import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Fab, Icon } from 'native-base';
import React from 'react';
import { ComponentProps } from 'src/interfaces/interfaces';

const CreateNews: React.FC = () => {
  const navigation = useNavigation<ComponentProps<'NewsCreate'>>();

  const handleClickAddNews = () => {
    navigation.navigate('NewsCreate', {});
  };

  return (
    <Fab
      onPress={handleClickAddNews}
      renderInPortal={false}
      shadow={2}
      size="sm"
      colorScheme="red"
      bottom={2}
      right={2}
      icon={<Icon textAlign="center" as={FontAwesome} name="plus" />}
    />
  );
};

export default CreateNews;
