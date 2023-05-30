import { signOut, AuthError } from 'firebase/auth';
import { useState } from 'react';
import { useApp } from 'src/hooks/useApp';
import { useAuth } from 'src/hooks/useAuth';
import { auth } from 'src/services/firebase';

export function useLogoutButton() {
  const { user } = useAuth();
  const { unsubscribe } = useApp();
  const [loading, setLoading] = useState<boolean>();

  const onLogout = async () => {
    setLoading(true);
    try {
      return await signOut(auth).then(() => {
        unsubscribe.forEach((fn) => fn());
      });
    } catch (error) {
      throw Error((error as AuthError).message);
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
