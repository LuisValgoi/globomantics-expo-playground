import { useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { REACT_APP_FIREBASE_AUTH_GOOGLE_WEB_CLIENT_ID } from '@env';
import { app, auth, firestore } from 'src/services/firebase';

export function useSignInWithGoogle() {
  const [loading, setLoading] = useState<boolean>(false);

  GoogleSignin.configure({
    webClientId: REACT_APP_FIREBASE_AUTH_GOOGLE_WEB_CLIENT_ID,
  });

  const onSignInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = app.auth.GoogleAuthProvider.credential(idToken);
      const credentials = await auth.signInWithCredential(googleCredential);

      if (credentials.additionalUserInfo?.isNewUser) {
        const payload = {
          name: credentials.user.displayName,
          email: credentials.user.email,
        };
        await firestore.collection('users').add(payload);
      }
    } catch (error) {
      throw Error((error as FirebaseAuthTypes.NativeFirebaseAuthError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onSignInWithGoogle,
  };
}
