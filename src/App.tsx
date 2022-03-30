import React from 'react';
import HomePage from './pages/Home';
import './App.css';
import { HomeContext, useHomeState } from './pages/Home/model';

function App() {
  const [value, funs] = useHomeState();

  return (
    <HomeContext.Provider value={[value, funs]}>
      <HomePage />
    </HomeContext.Provider>
  );
}

export default App;
