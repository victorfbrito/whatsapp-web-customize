import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as ct from './chromeServices/content'
import * as bg from './chromeServices/background'

function App() {
  const [str_nmb, setStr_nmb] = React.useState(0)

  function messageSender(msg: any) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    if (activeTab.id) chrome.tabs.sendMessage(activeTab.id, msg);
   });
  } 

  async function Increment() {
    messageSender({'message': 'helloo'})
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
          Button clicked <code>{str_nmb}</code> times.
        </p>
        <button id="button1" style={{cursor: 'pointer'}} onClick={() => Increment()}>Teste</button>
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
