import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Platform } from 'react-native';

import GoBackButton from 'src/components/_shared_/GoBackButton/GoBackButton';
import { HStack, Image, Text } from 'native-base';
import logo from '../../../../assets/logo.png';
import LogoutButton from '../LogoutButton/LogoutButton';

export type HeaderProps = {
  display: string;
};

const Header: React.FC<HeaderProps> = ({ display }) => {
  return (
    <>
      <SafeAreaProvider>
        <InternalHeader display={display} />
      </SafeAreaProvider>
    </>
  );
};

export default Header;

const InternalHeader: React.FC<HeaderProps> = ({ display }) => {
  const styles = useStyles();

  return (
    <HStack style={styles.header} backgroundColor="red.500" alignItems="center">
      <HStack
        flex={10}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <HStack
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          position="absolute"
          left={2}
        >
          <GoBackButton />
        </HStack>
        <Image source={logo} style={{ height: 40, width: 40 }} alt="Logo" />
        <Text color="white">{display}</Text>
        <HStack
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          position="absolute"
          right={2}
        >
          <LogoutButton />
        </HStack>
      </HStack>
    </HStack>
  )
}

function useStyles() {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    header: {
      height: Platform.OS === 'android' ? 70 : 110,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    logo: {
      width: 35,
      height: 35,
    },
  });
}
