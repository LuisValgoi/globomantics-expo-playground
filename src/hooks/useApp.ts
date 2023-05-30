import { useContext } from 'react';

import { AppContext } from 'src/providers/App';

export function useApp() {
  const context = useContext(AppContext);

  return {
    ...context,
  };
}
