import React from 'react';

import * as ts from '../../types'
import * as sc from './styles'

export default function SchemeButton( { data }  : any) {

    var tab:any;
    
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      tab = tabs[0]
    });
    
    function sendMessage(msg: any) {
        console.log('sending message: ', msg)
        chrome.tabs.sendMessage(tab.id, msg);
    }
    
    return(
        <sc.Container onClick={() => sendMessage({type: "change_root_variables", content: data})}>
            <sc.Circle>
                {data.length > 1 ? data.slice(0, 2).map((e: ts.Color, i: number) => 
                    <sc.Slice color={e} key={i}/>
                ) :
                    <sc.Slice whole color={data[0]} key={0}/>
                }
            </sc.Circle>
        </sc.Container>
    )
}