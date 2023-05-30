import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { SignInScreenCompFormValues } from 'src/components/_screens_/SignIn';
import { useAuth } from 'src/hooks/useAuth';
import { auth } from 'src/services/firebase';

export function useSignIn() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = async (form: SignInScreenCompFormValues) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (error) {
      throw Error((error as AuthError).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInWithGoogle = async () => {
    setLoading(true);
    try {
      return Promise.resolve()
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
    onSignInWithGoogle,
  };
}
