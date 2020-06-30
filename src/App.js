import React from 'react'
import { Provider } from 'react-redux'

import store from './store'

import CalcApp from './calc-app'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CalcApp/>
      </Provider>
    </div>
  );
}

export default App;
