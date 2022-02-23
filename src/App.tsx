import React from 'react';
import logo from './logo.svg';
import './App.css';
import { addNumber, changeColor } from './chromeServices/content'


function App() {
  const [str_nmb, setStr_nmb] = React.useState(0)

  React.useEffect(() => {
    console.log('new nbm from storage: ',chrome.storage?.sync?.get('selected_number'))
    changeColor('red')
  }, [])

  async function Increment() {
    const nmb = await chrome.storage?.sync?.get('selected_number') || 0
    const new_nmb = parseInt(nmb?.selected_number) + 1
    if (new_nmb) addNumber(new_nmb)
    else addNumber(1)
    setStr_nmb(new_nmb)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edite <code>{str_nmb}</code> and save to reload.
        </p>
        <button  style={{cursor: 'pointer'}} onClick={() => Increment()}>Teste</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
