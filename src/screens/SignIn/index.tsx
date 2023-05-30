import React from 'react';
import { Alert } from 'react-native';
import { Box } from 'native-base';
import SignInScreenComp, {
  SignInScreenCompFormValues,
} from 'src/components/_screens_/SignIn';
import { ScreenProps } from 'src/interfaces/interfaces';
import { useSignIn } from 'src/services/useSignIn';

type SignInProps = ScreenProps<'SignIn'>;

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const { loading, onSubmit, onSignInWithGoogle } = useSignIn();

  const handleSignUpClick = () => {
    navigation.navigate('SignUp', {});
  };

  const handleSubmit = async (form: SignInScreenCompFormValues) => {
    await onSubmit(form)
      .then(() => {
        navigation.navigate('News', {});
      })
      .catch((error) => {
        Alert.alert(error.message, undefined, [{ text: 'Try Again' }]);
      });
  };

  const handleSignInWithGoogle = async () => {
    await onSignInWithGoogle()
      .then(() => {
        // navigation.navigate('News', {});
        console.log('REDIRECT?');
      })
      .catch(() => {});
  };

  return (
    <Box bg="gray.100" pt="1/3" pl="2" pr="2" height="full">
      <SignInScreenComp
        isLoading={loading}
        onSignUpClick={handleSignUpClick}
        onSubmit={handleSubmit}
        onSignInWithGoogle={handleSignInWithGoogle}
      />
    </Box>
  );
};

export default SignIn;
