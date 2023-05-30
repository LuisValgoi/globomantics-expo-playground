import { Spinner, ISpinnerProps } from 'native-base';
import React from 'react';

const LoadingIndicator: React.FC<ISpinnerProps> = (props) => {
  return <Spinner color="red" accessibilityLabel="Loading..." {...props} />;
}

export default LoadingIndicator;
