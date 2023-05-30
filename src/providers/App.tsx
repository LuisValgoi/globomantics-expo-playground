import { Unsubscribe, User } from 'firebase/auth';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

export type AppContextValue = {
  unsubscribe: Unsubscribe[];
  setUnsubscribe: Dispatch<SetStateAction<Unsubscribe[]>>;
};

export const AppContext = createContext<AppContextValue>(
  {} as AppContextValue
);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe[]>([]);

  return (
    <AppContext.Provider
      value={{
        unsubscribe,
        setUnsubscribe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
