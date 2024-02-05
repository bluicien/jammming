import './App.css';
import Body from './Components/Body';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div id='contentContainer'>
        <Body />
      </div>
    </div>
  );
}

export default App;

