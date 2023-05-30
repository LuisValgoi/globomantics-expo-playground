import React from 'react';

import { INews } from 'src/interfaces/interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from 'src/components/_application_/News/NewsItem';
import { VStack } from 'native-base';

type NewsDetailScreenCompProps = {
  newsDetail: INews;
  onNewsEditPress: () => void;
};

const NewsDetailScreenComp: React.FC<NewsDetailScreenCompProps> = ({
  onNewsEditPress,
  newsDetail,
}) => {
  return (
    <ScrollView>
      <VStack space="2">
        <NewsItem
          newsDetail={newsDetail}
          onNewsEditPress={onNewsEditPress}
        />
      </VStack>
    </ScrollView>
  );
};

export default NewsDetailScreenComp;
