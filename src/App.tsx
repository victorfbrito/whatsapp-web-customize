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
  const [selected, setSelected] = React.useState({})
  console.log(selected_theme)
  // console.log('props: ', props)
  var tab:any;
  // chrome.runtime.onMessage.addListener(gotMessage)
  // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  //   tab = tabs[0]
  // });
  const [str_nmb, setStr_nmb] = React.useState(0)
  const [newValue, setNewValue] = React.useState('')
  const [styleValues, setStyleValues] = React.useState<any[]>([])

  // function sendMessage(msg: any) {
  //   chrome.tabs.sendMessage(tab.id, msg);
  // }

  // function gotMessage(message: any, sender: any, sendResponse: any) {
  //   console.log('message received: ', message, sender)
  //   if (message.type === "send_styles") {
  //     console.log('changing styles')
  //     getStyles()
  //     sendResponse('mocked response')
  //   }
  // }

  // React.useEffect(() => {
  //   // getStyles()
  //   // getNumber()
  //   console.log('props: ',props)
  // }, [props])

  React.useEffect(() => console.log('new stylevalues: ',styleValues), [styleValues])

  // function getStyles() {
  //   console.log('new styles coming')
  //   chrome.storage.local.get('current_styles').then((res:any) => {
  //     console.log('res: ', res.current_styles)
  //     setStyleValues(res.current_styles)
  //   })
  // }

  // function cancelChange() {
  //   chrome.storage.local.get('current_styles').then((res:any) => {
  //     setStyleValues([...res.current_styles])
  //   })
  //   sendMessage({type: 'cancel_changes'})
  // }

  // function resetStyles() {
  //   sendMessage({type: 'reset_styles'})
  // }

  // function saveStyles() {
  //   chrome.storage.local.set({'current_styles': styleValues}).then(() => 
  //       console.log('updated styles')
  //   )
  // }

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

  // async function Increment() {
  //   console.log('increment number')
  //   // const new_nmb = str_nmb + 1
  //   // addNumber(new_nmb)
  //   // setStr_nmb(new_nmb)
  // }

  // async function changeState(event: any) {
  //   setNewValue(event.target.value)
  // }
  async function changeBackground(e: any) {
    console.log('changing background')
    // if (e.type === 'custom') {
    //   console.log('custom')
    //   sendMessage({type: 'choose_file', path: e.path})
    // } else {
    //   console.log('!custom')
    //   sendMessage({type: 'change_background', path: e.path})
    // }
  }

  // async function changeProp() {
  //   sendMessage({type: 'change_prop', var_name: '--conversation-panel-background', 'val': newValue})
  // }

  return (
      <AppContainer>
        <ThemeList>
          {themes.map((i, p) => 
            <div onClick={() => changeTheme(i)} key={p}>
              <ThemeListItem data={i}/>
            </div>
          )}
          {/* delete below */}
          {themes.map((i, p) => 
            <div onClick={() => changeTheme(i)} key={p}>
              <ThemeListItem data={i}/>
            </div>
          )}
        </ThemeList>
        <ThemeInfo data={selected_theme.data} />
        {/* {themes.map(e => 
          <img src={'backgrounds/' + e.path + '/thumbnail.png'} alt={e.title} onClick={() => changeBackground(e)}/>
        )} */}
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

// export default connect()(App);