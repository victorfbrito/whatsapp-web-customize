import React from 'react';
import logo from './logo.svg';
import './App.css';
import themes from './store/themes_data.json'

function App() {
  var tab:any;
  chrome.runtime.onMessage.addListener(gotMessage)
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    tab = tabs[0]
  });
  const [str_nmb, setStr_nmb] = React.useState(0)
  const [newValue, setNewValue] = React.useState('')
  const [styleValues, setStyleValues] = React.useState<any[]>([])

  function sendMessage(msg: any) {
    chrome.tabs.sendMessage(tab.id, msg);
  }

  function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    if (message.type === "send_styles") {
      console.log('changing styles')
      getStyles()
      sendResponse('mocked response')
    }
  }

  React.useEffect(() => {
    getStyles()
    getNumber()
  }, [])

  React.useEffect(() => console.log('new stylevalues: ',styleValues), [styleValues])

  function getStyles() {
    console.log('new styles coming')
    chrome.storage.local.get('current_styles').then((res:any) => {
      console.log('res: ', res.current_styles)
      setStyleValues(res.current_styles)
    })
  }

  function cancelChange() {
    chrome.storage.local.get('current_styles').then((res:any) => {
      setStyleValues([...res.current_styles])
    })
    sendMessage({type: 'cancel_changes'})
  }

  function resetStyles() {
    sendMessage({type: 'reset_styles'})
  }

  function saveStyles() {
    chrome.storage.local.set({'current_styles': styleValues}).then(() => 
        console.log('updated styles')
    )
  }

  function getNumber() {
    chrome.storage.local.get('selected_number').then(res => {
      if (res.selected_number) setStr_nmb(res.selected_number)
    })
  }

  function addNumber(x: Number) {
    chrome.storage.local.set({'selected_number': x}, function() {
      console.log('Value is set to ' + x);
    })
  }

  async function Increment() {
    const new_nmb = str_nmb + 1
    addNumber(new_nmb)
    setStr_nmb(new_nmb)
  }

  async function changeState(event: any) {
    setNewValue(event.target.value)
  }

  async function changeBackground(e: any) {
    if (e.type === 'custom') {
      console.log('custom')
      sendMessage({type: 'choose_file', path: e.path})
    } else {
      console.log('!custom')
      sendMessage({type: 'change_background', path: e.path})
    }
  }

  async function changeProp() {
    sendMessage({type: 'change_prop', var_name: '--conversation-panel-background', 'val': newValue})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
          <h1>Select Image</h1>
        {themes.map(e => 
          <img src={'backgrounds/' + e.path + '/thumbnail.png'} alt={e.title} onClick={() => changeBackground(e)}/>
        )}
        
        <button id="button1" style={{cursor: 'pointer'}} onClick={() => changeProp()}>OK</button>

        <p>
         Discard changes
        </p>
        <button id="button2" style={{cursor: 'pointer'}} onClick={() => cancelChange()}>Cancel</button>
        <button id="button3" style={{cursor: 'pointer'}} onClick={() => saveStyles()}>Save</button>
        <button id="button3" style={{cursor: 'pointer'}} onClick={() => resetStyles()}>Reset</button>
        
        <p>
          ==============================
        </p>
        <p>
          This button was clicked <code>{str_nmb}</code> times.
        </p>
        <button id="button4" style={{cursor: 'pointer'}} onClick={() => Increment()}>Increment</button>
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