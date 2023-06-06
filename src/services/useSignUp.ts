import { useState } from 'react';
import { SignUpScreenCompFormValues } from 'src/components/_screens_/SignUp';
import { useAuth } from 'src/hooks/useAuth';
import { auth, firestore } from 'src/services/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function useSignUp() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = async (form: SignUpScreenCompFormValues) => {
    setLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      await auth.currentUser?.updateProfile({
        displayName: form.name,
      });

      const payload = { name: form.name, email: form.email };
      await firestore.doc(`users/${user.uid}`).update(payload);
    } catch (error) {
      throw Error((error as FirebaseAuthTypes.NativeFirebaseAuthError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    onSubmit,
  };
}
