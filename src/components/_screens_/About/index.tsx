import { Text, VStack } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import VideoPlayer from 'src/components/_application_/VideoPlayer/VideoPlayer';

type AboutScreenCompProps = {
  title: string;
  about: string;
};

const AboutScreenComp: React.FC<AboutScreenCompProps> = ({ title, about }) => {
  return (
    <ScrollView>
      <VStack bg="white" space="6" p="6" borderRadius="md">
        <VideoPlayer width="full" borderRadius="md" />
        <Text textAlign="center" fontWeight="bold" fontSize="3xl">
          {title}
        </Text>
        <Text>{about}</Text>
      </VStack>
    </ScrollView>
  );
};

export default AboutScreenComp;
