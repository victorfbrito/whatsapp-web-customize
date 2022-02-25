import React from 'react';
import logo from './logo.svg';
import './App.css';

var tab:any;

chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  tab = tabs[0]
});

function App() {
  const [str_nmb, setStr_nmb] = React.useState(0)
  const [newValue, setNewValue] = React.useState('')

  function messageSender(msg: any) {
    chrome.tabs.sendMessage(tab.id, msg);
  }

  function addNumber(x: Number) {
    chrome.storage.sync.set({'selected_number': x}, function() {
      console.log('Value is set to ' + x);
    })
  }

  chrome.storage?.sync?.get('selected_number').then(res => {
    if (res.selected_number) setStr_nmb(res.selected_number)
  })

  async function Increment() {
    const new_nmb = str_nmb + 1
    addNumber(new_nmb)
    setStr_nmb(new_nmb)
  }

  async function changeState(event: any) {
    setNewValue(event.target.value)
  }

  async function changeProp() {
    messageSender({'change_prop': {'prop': '--conversation-panel-background', 'val': newValue}})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <input value={newValue} onChange={changeState}/>
        <p>
          Write a color to override the chat background
        </p>
        <button id="button1" style={{cursor: 'pointer'}} onClick={() => changeProp()}>OK</button>
        <p>
          This button was clicked <code>{str_nmb}</code> times.
        </p>
        <button id="button1" style={{cursor: 'pointer'}} onClick={() => Increment()}>Increment</button>
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
