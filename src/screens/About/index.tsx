import { Box } from 'native-base';
import React from 'react';
import AboutScreenComp from 'src/components/_screens_/About';
import { ScreenProps } from 'src/interfaces/interfaces';

const blockA = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla id ipsum sit amet congue. Suspendisse non scelerisque velit, id consectetur justo. Nulla sed libero consequat, dignissim velit non, eleifend leo. Nullam a sem pulvinar, accumsan lacus in, cursus magna. Donec quis nunc porta, aliquet massa vitae, auctor nulla. Aliquam erat volutpat. Mauris in dapibus orci, id bibendum metus. Maecenas efficitur tortor a facilisis cursus. Donec quis lorem vitae eros rhoncus viverra. Donec vel lacus sapien.`;

type AboutProps = ScreenProps<'About'>;

const About: React.FC<AboutProps> = ({ navigation }) => {
  return (
    <Box bg="gray.100" pt="1/3" pl="2" pr="2" height="full">
      <AboutScreenComp title="We are different!" about={blockA} />
    </Box>
  );
};

export default About;
