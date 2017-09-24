import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const savedPath = '/Users/Max/Dropbox';

render(
  <AppContainer>
    <App path={savedPath} />
  </AppContainer>,
  document.getElementById('root')
);
