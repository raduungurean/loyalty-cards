import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import { setupStore } from './store';
function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
