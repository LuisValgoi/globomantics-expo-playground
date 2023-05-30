import { useEffect, useState } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AuthError } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export function useSignInWithGoogle() {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>('');
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '66577883763-vsl2ucs2cl61iadskm6spi284kgva0rd.apps.googleusercontent.com',
    expoClientId:
      '66577883763-0drcogrmmjg4vmhs4dkjc5e1n77odgpo.apps.googleusercontent.com',
  });

  const onSignInWithGoogle = async () => {
    setLoading(true);
    try {
      return promptAsync()
        .then((value) => console.log(value, 'SUCCESS'))
        .catch((error) => console.log(error, 'CATCH'));
    } catch (error) {
      throw Error((error as AuthError).message);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      setToken((response as any).authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return {
    loading,
    userInfo,
    onSignInWithGoogle,
  };
}
