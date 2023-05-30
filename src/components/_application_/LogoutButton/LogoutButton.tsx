import React, { useRef, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AlertDialog, Button, Icon } from 'native-base';
import { type ComponentProps } from 'src/interfaces/interfaces';
import { useLogoutButton } from 'src/components/_application_/LogoutButton/useLogoutButton';
import { Alert } from 'react-native';

const LogoutButton = () => {
  const cancelRef = useRef(null);

  const navigation = useNavigation<ComponentProps<'SignIn'>>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { userName, loading, onLogout } = useLogoutButton();

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = async () => {
    await onLogout()
      .then(() => {
        handleClose();
        navigation.navigate('SignIn', {});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  return (
    <>
      <Button onPress={handleOpen} p="2">
        <Icon
          as={FontAwesome}
          name="user"
          color="white"
          display="flex"
          alignItems="center"
          textAlign="center"
        />
      </Button>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={handleClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Hey, ${userName}`}</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to logout from the app?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={handleClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                isLoading={loading}
                colorScheme="danger"
                onPress={handleLogout}
              >
                Yes, I am!
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default LogoutButton;
