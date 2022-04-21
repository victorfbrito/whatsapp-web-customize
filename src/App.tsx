import React, { useEffect } from 'react';
import './App.css';

import AppContainer from './components/app_container';
import ThemeList from './components/theme_list';
import ThemeInfo from './components/theme_info';

var tab:any;

chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  tab = tabs[0]
});

function sendMessage(msg: any, get_response?: any) {
  chrome.tabs.sendMessage(tab.id, msg, get_response || null);
}

export default function App() {
  const [selected_theme, setSelectedTheme] = React.useState<any>(null)

  useEffect(() => {
    chrome.storage.local.get("selected_theme").then(e => setSelectedTheme(e.selected_theme))
  }, [])

  async function chooseTheme(e: any) {
    if (e.type === 'custom') {
      console.log('custom')
      sendMessage({type: 'choose_file', path: e.path})
    } else {
      console.log('!custom')
      chrome.storage.local.set({'selected_variables': e.color_schemes[0]}, function() {
        console.log('setting variables: ',e.color_schemes[0])
      })
      chrome.storage.local.set({'selected_theme': e}, function() {
        console.log('setting bg: ',e)
        setSelectedTheme(e)
      })
      sendMessage({type: 'change_root_variables', content: e.color_schemes[0]}, function(response: any) {
        sendMessage({type: 'change_background', path: e.path, bg_type: e.type}, function() {
        })
      })
    }
  }

  return (
      <AppContainer>
        <ThemeList chooseTheme={(i: any) => chooseTheme(i)} />
        {selected_theme &&
          <ThemeInfo data={selected_theme} />
        }
      </AppContainer>
  );
};