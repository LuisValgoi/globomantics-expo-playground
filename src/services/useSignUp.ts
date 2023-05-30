import {
  AuthError,
  updateProfile,
  createUserWithEmailAndPassword as createProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { SignUpScreenCompFormValues } from 'src/components/_screens_/SignUp';
import { useAuth } from 'src/hooks/useAuth';
import { auth, firestore } from 'src/services/firebase';

export function useSignUp() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = async (form: SignUpScreenCompFormValues) => {
    setLoading(true);
    try {
      const { user } = await createProfile(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.name });

      const userAddRef = doc(firestore, 'users', user.uid);
      const userAddPayload = { name: form.name, email: form.email };
      await setDoc(userAddRef, userAddPayload);

    } catch (error) {
      throw Error((error as AuthError).message);
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
