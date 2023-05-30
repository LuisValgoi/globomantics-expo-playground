import { User, onAuthStateChanged } from 'firebase/auth';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useApp } from 'src/hooks/useApp';
import { auth } from 'src/services/firebase';

export type AuthContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setUnsubscribe } = useApp()
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    setUnsubscribe((prev) => [...prev, listener]);

    return () => {
      listener();
    };
  }, [auth]);

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
