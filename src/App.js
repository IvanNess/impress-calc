import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import VideoCalc from './VideoCalc'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <VideoCalc />
      </Provider>
    </div>
  );
}

export default App;
