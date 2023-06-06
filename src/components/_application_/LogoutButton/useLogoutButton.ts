import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { auth } from 'src/services/firebase';

export function useLogoutButton() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>();

  const onLogout = async () => {
    setLoading(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth.signOut();
      return await auth.currentUser?.reload();
    } catch (error) {
      throw Error((error as FirebaseAuthTypes.NativeFirebaseAuthError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userName: user?.displayName,
    loading,
    onLogout,
  };
}
