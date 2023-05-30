import { useContext } from 'react';

import { AuthContext } from 'src/providers/Auth';

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    ...context,
  };
}
