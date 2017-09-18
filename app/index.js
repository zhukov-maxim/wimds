import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import os from 'os';

import io from './io';
import App from './App';

const homeDir = os.homedir();
const path = `${homeDir}/Downloads`;

const cleanRoot = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
};

let data;

const renderApp = () => {
  render(
    <AppContainer>
      <App data={data} />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp();

setTimeout(() => {
  data = io.getFolderContent(path);
  cleanRoot();
  renderApp();
}, 2000);
