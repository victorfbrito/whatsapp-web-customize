import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  function changeColor() {
    console.log('teste')
    console.log(chrome.tabs)
    
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const tab = tabs[0]
        console.log('tab found: ', tab)
        console.log('Turning ' + tab.url + ' red!');
    })

    try {
      const el = document?.getElementById('navbarTop')
      console.log('element selected: ', el)
      if (el) el.style.backgroundColor = "yellow"
    }catch{
      console.log('error in select element')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edite <code>src/App.tsx</code> and save to reload.
        </p>
        <button  style={{cursor: 'pointer'}} onClick={() => changeColor()}>Teste</button>
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
