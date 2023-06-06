import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { app, auth } from 'src/services/firebase';

export type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  /** Listen for auth state changes */
  useEffect(() => {
    const authListener = auth.onAuthStateChanged((result) => {
      setUser(result);
      if (initializing && !listenUser) {
        setInitializing(false);
        setListenUser(true);
      }
    });

    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, [initializing, listenUser]);

  /** Listen for user changes */
  useEffect(() => {
    let userListener: () => void;

    if (listenUser) {
      userListener = auth.onIdTokenChanged((result) => {
        setUser(result);
      });
    }

    return () => {
      if (userListener) {
        userListener();
      }
    };
  }, [listenUser]);

  if (initializing) {
    let waiting = true;
    setTimeout(() => {
      waiting = false;
    }, 1000);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
