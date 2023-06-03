import { useState } from 'react';

export function useSignInWithGoogle() {
  const [loading, setLoading] = useState<boolean>(false);

  const onSignInWithGoogle = async () => {
    setLoading(true);
    try {
      return Promise;
    } catch (error) {
      throw Error();
    }
  };

  return {
    loading,
    onSignInWithGoogle,
  };
}
