import { Box, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import RemoteImage from '../RemoteImage';
import { Timestamp } from 'firebase/firestore';

type NewsListItemProps = {
  onPress: () => void;
  title: string;
  description: string;
  createdAt?: Timestamp;
  imagePath?: string;
};

const NewsListItem: React.FC<NewsListItemProps> = ({
  onPress,
  title,
  imagePath,
  createdAt,
  description,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box bg="white" borderRadius="md" p="4" mb="2">
        <VStack space="2">
          <Text fontFamily="body" fontStyle="bold" fontWeight="400">
            Title: {title}
          </Text>
          <RemoteImage
            imagePath={imagePath}
            alt={title}
            borderRadius="md"
            w="full"
            height="24"
          />
          <Text fontFamily="body" fontWeight="400">
            Description: {description}
          </Text>
          <Text fontFamily="body" fontWeight="400" color="gray.300">
            Created at: {createdAt?.toDate().toDateString()}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default NewsListItem;
