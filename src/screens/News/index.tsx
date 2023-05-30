import React from 'react';
import { Box } from 'native-base';

import NewsScreenComp from 'src/components/_screens_/News';
import { INews, ScreenProps } from 'src/interfaces/interfaces';
import useNews from 'src/services/useNews';
import LoadingIndicator from 'src/components/_shared_/LoadingIndicator';
import CreateNews from 'src/components/_application_/CreateNews';

type NewsProps = ScreenProps<'News'>;

const News: React.FC<NewsProps> = ({ navigation }) => {
  const { loading, news, empty } = useNews();

  const handleItemPress = (item: INews) => {
    navigation.navigate('NewsDetail', { id: item.id });
  };

  return (
    <Box bg="gray.100" pt="1/3" pl="2" pr="2" height="full">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <CreateNews />
          <NewsScreenComp onItemPress={handleItemPress} news={news} empty={empty} />
        </>
      )}
    </Box>
  );
};

export default News;
