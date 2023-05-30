import React from 'react';
import { Box } from 'native-base';
import NewsFormScreenComp, {
  NewsFormScreenCompFormValues,
} from 'src/components/_screens_/NewsForm';
import { Alert } from 'react-native';
import { ScreenProps } from 'src/interfaces/interfaces';
import useNewsCreate from '../../services/useNewsCreate';

type NewsCreateProps = ScreenProps<'NewsCreate'>;

const NewsCreate: React.FC<NewsCreateProps> = ({ navigation }) => {
  const { create, loading } = useNewsCreate();

  const handleSubmit = async (formValues: NewsFormScreenCompFormValues) => {
    return await create(formValues)
      .then(() => {
        Alert.alert('Successfully added');
        navigation.navigate('News', {});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  return (
    <Box bg="gray.100" pt="1/3" pl="2" pr="2" height="full">
      <NewsFormScreenComp loading={loading} onSubmit={handleSubmit} />
    </Box>
  );
};

export default NewsCreate;
