import React from 'react';
import { Box } from 'native-base';
import NewsFormScreenComp, {
  NewsFormScreenCompFormValues,
} from 'src/components/_screens_/NewsForm';
import { Alert } from 'react-native';
import { ScreenProps } from 'src/interfaces/interfaces';
import LoadingIndicator from 'src/components/_shared_/LoadingIndicator';
import useNewsEdit from 'src/services/useNewsEdit';
import useNewsDetail from '../../services/useNewsDetail';

type NewsEditProps = ScreenProps<'NewsEdit'>;

const NewsEdit: React.FC<NewsEditProps> = ({ navigation, route }) => {
  const { news, loading } = useNewsDetail(route.params.id);
  const { update, loading: uLoading } = useNewsEdit(route.params.id);

  const handleSubmit = async (formValues: NewsFormScreenCompFormValues) => {
    await update(formValues)
      .then(() => {
        navigation.navigate('News', {});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  return (
    <Box bg="gray.100" pt="1/3" pl="2" pr="2" height="full">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <NewsFormScreenComp loading={uLoading} newsDetail={news} onSubmit={handleSubmit} />
      )}
    </Box>
  );
};

export default NewsEdit;
