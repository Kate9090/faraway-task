import React from 'react';

import {Routing} from 'pages';

import {store} from 'app/store';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
    

  );
}

export default App;
