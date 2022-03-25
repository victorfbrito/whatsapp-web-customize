import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import themes from './store/themes_data.json'
import { connect } from 'react-redux'
import { addTodo, changeTheme } from './store/actions';
import { toggleTodo, increment } from './store/actions';

import AppContainer from './components/app_container';
import ThemeListItem from './components/theme_list_item';
import ThemeList from './components/theme_list';
import ThemeInfo from './components/theme_info';
import * as ts from './types';

var tab:any;

chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  tab = tabs[0]
});

function sendMessage(msg: any, get_response?: any) {
  chrome.tabs.sendMessage(tab.id, msg, get_response || null);
}

function App({ changeTheme }: any) {
  const [selected_theme, setSelectedTheme] = React.useState<any>(null)

  // function getNumber() {
  //   chrome.storage.local.get('selected_number').then(res => {
  //     if (res.selected_number) setStr_nmb(res.selected_number)
  //   })
  // }

  // function addNumber(x: Number) {
  //   chrome.storage.local.set({'selected_number': x}, function() {
  //     console.log('Value is set to ' + x);
  //   })
  // }

  useEffect(() => {console.log('new theme: ', selected_theme)}, [selected_theme])

  useEffect(() => {
    chrome.storage.local.get("selected_theme").then(e => setSelectedTheme(e.selected_theme))
  }, [])

  async function chooseTheme(e: any) {
    if (e.type === 'custom') {
      console.log('custom')
      sendMessage({type: 'choose_file', path: e.path})
    } else {
      console.log('!custom')
      changeTheme(e)
      sendMessage({type: 'change_root_variables', content: e.color_schemes[0]}, function(response: any) {
        chrome.storage.local.set({'selected_theme': e}, function() {
          setSelectedTheme(e)
        })
        sendMessage({type: 'change_background', path: e.path})
      })
    }
  }

  return (
      <AppContainer>
        <ThemeList>
          {themes.map((i, p) => 
            <div onClick={() => chooseTheme(i)} key={p}>
              <ThemeListItem data={i}/>
            </div>
          )}
          {/* delete below */}
          {themes.map((i, p) => 
            <div onClick={() => chooseTheme(i)} key={p}>
              <ThemeListItem data={i}/>
            </div>
          )}
        </ThemeList>
        {selected_theme &&
          <ThemeInfo data={selected_theme} />
        }
      </AppContainer>
  );
}

const mapStateToProps = (state: any) => ({
  count: state.counter.counter,
  selected_theme: state.selected_theme.data
})

const mapDispatchToProps = (dispatch: any) => ({
  increment: (nmr: any) => {
    dispatch(increment(nmr))
  },
  changeTheme: (data: ts.ThemeItemProps) => {
    dispatch(changeTheme({data: data}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);