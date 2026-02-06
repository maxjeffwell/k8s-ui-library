import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Dimmer active inverted>
      <Loader size="large">{message}</Loader>
    </Dimmer>
  );
}
