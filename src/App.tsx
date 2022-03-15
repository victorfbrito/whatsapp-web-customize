import React from 'react';
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


function App({ selected_theme, changeTheme }: any) {
  
  // var tab:any;
  // chrome.runtime.onMessage.addListener(gotMessage)
  // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  //   tab = tabs[0]
  // });

  // function sendMessage(msg: any) {
  //   chrome.tabs.sendMessage(tab.id, msg);
  // }

  function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    if (message.type === "send_styles") {
      console.log('changing styles')
      sendResponse('mocked response')
    }
  }

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

  async function chooseTheme(e: any) {
    if (e.type === 'custom') {
      console.log('custom')
      // sendMessage({type: 'choose_file', path: e.path})
    } else {
      console.log('!custom')
      changeTheme(e)
      // sendMessage({type: 'change_background', path: e.path})
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
        <ThemeInfo data={selected_theme.data} />
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