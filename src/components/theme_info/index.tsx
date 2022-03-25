import React from 'react';

import ThemeConfig from '../theme_config'
import SchemeButton from '../scheme_button';

import * as ts from '../../types'
import * as sc from './styles'

export default function ThemeInfo({ data }: ts.ThemeItemType) {

    var tab:any;
    
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      tab = tabs[0]
    });
    
    function sendMessage(msg: any) {
        console.log('sending message: ', msg)
        chrome.tabs.sendMessage(tab.id, msg);
    }

    return(
        <sc.Container>
            {data?.title &&
                <>
                    <sc.Icon src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title} />
                    <p>{data.title}</p>
                    {data.color_schemes && 
                        <sc.SchemeList>
                            {data.color_schemes.map(e => 
                                <SchemeButton data={e} />   
                            )}
                        </sc.SchemeList>
                    }
                    {data.custom_props && 
                        <ThemeConfig custom_props={data.custom_props} />
                    }
                    {data.artist &&
                        <p>Theme based on code by <a href={data.artist.link} target="_blank" rel="noreferrer">{data.artist.name}</a></p>
                    }
                    <button onClick={() => sendMessage({type: "remove_theme"})}>Reset</button>
                </>
            }
        </sc.Container>
    )
}