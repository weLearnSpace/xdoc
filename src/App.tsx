// import HomePage from './pages/Home';
import './App.css';
import { HomeContext, useHomeState } from './pages/Home/model';

function App() {
  const [value, funs] = useHomeState();

  return (
    <HomeContext.Provider value={[value, funs]}>
      {/* <HomePage /> */}
      <div>123123</div>
    </HomeContext.Provider>
  );
}

export default App;
