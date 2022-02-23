import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as ct from './chromeServices/content'
import * as bg from './chromeServices/background'


function App() {
  const [str_nmb, setStr_nmb] = React.useState(0)
  const [pageId, setPageId] = React.useState(0)
  
  React.useEffect(() => {
    chrome.tabs.query({active: true}).then(
      res1 => res1.length > 0 && res1[0].id && setPageId(res1[0].id)
    )
  }, [])

  async function Increment() {
    const nmb = await chrome.storage?.sync?.get('selected_number') || 0
    const new_nmb = parseInt(nmb?.selected_number) + 1
    if (new_nmb) ct.addNumber(new_nmb)
    else ct.addNumber(1)
    setStr_nmb(new_nmb)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edite <code>{pageId}</code> and save to reload.
        </p>
        <p>
          Button clicked <code>{str_nmb}</code> times.
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
