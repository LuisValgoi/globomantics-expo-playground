import { Box, IconButton, Skeleton, Text, VStack } from 'native-base';
import React from 'react';
import RemoteImage from '../RemoteImage';
import { FontAwesome } from '@expo/vector-icons';
import { INews } from 'src/interfaces/interfaces';

type NewsItemProps = {
  newsDetail: INews | undefined;
  onNewsEditPress: () => void;
};

const NewsItem: React.FC<NewsItemProps> = ({
  newsDetail,
  onNewsEditPress,
}) => {
  if (!newsDetail) {
    return <Skeleton borderRadius="sm" />;
  }

  return (
    <>
      <Box bg="white" borderRadius="md" p="4">
        <IconButton
          onPress={onNewsEditPress}
          position="absolute"
          right="2"
          top="2"
          borderRadius="full"
          variant="subtle"
          backgroundColor="red.500"
          icon={
            <FontAwesome
              name="pencil"
              color="white"
              onPress={onNewsEditPress}
            />
          }
        />
        <VStack space="4">
          <Text
            fontFamily="body"
            fontStyle="bold"
            fontWeight="400"
            fontSize="xl"
            textAlign="center"
          >
            Title: {newsDetail.title}
          </Text>
          <RemoteImage
            imagePath={newsDetail.imagePath}
            alt={newsDetail.title}
            borderRadius="md"
            w="full"
            height="xs"
          />
          <Text fontFamily="body" fontWeight="400">
            Description: {newsDetail.description}
          </Text>
          <Text fontFamily="body" fontWeight="400" color="gray.300">
            Created at: {newsDetail.createdAt?.toDate().toDateString()}
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default NewsItem;
