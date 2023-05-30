import React from 'react';
import { Alert } from 'react-native';
import { Box } from 'native-base';
import SignInScreenComp, {
  SignInScreenCompFormValues,
} from 'src/components/_screens_/SignIn';
import { ScreenProps } from 'src/interfaces/interfaces';
import { useSignIn } from 'src/services/useSignIn';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

type SignInProps = ScreenProps<'SignIn'>;

// WebBrowser.maybeCompleteAuthSession();

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: '66577883763-0drcogrmmjg4vmhs4dkjc5e1n77odgpo.apps.googleusercontent.com',
  // });

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
    // await promptAsync()
    //   .then((value) => console.log(value, 'SUCCESS'))
    //   .catch((error) => console.log(error, 'CATCH'));
    await onSignInWithGoogle()
      .then(() => {
        navigation.navigate('News', {});
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
