import * as styles_data from '../store/root_vars.json'

chrome.runtime.onMessage.addListener(gotMessageBg)

export function gotMessageBg(message: any, sender: any, sendResponse: any) {
    console.log('background gotmessage: ', message, sender)
    if (sender && sender.tab && sender.tab.id) {
        if (message.type === "retrieve_dom") {
            chrome.scripting.executeScript({target: {tabId: sender.tab.id}, func: getRootVarValues, args: [styles_data]}, function (res: any) {
                console.log(res[0].result)
            })
        }
    }
    sendResponse('mocked response')
}

export function getRootVarValues(styles: any) {
    var def_styles : any = []
    const app = getComputedStyle(document.documentElement)
    for (const prop in styles) {
        const res = app.getPropertyValue(styles[prop].name)
        def_styles.push({name: styles[prop].name, val: res, desc: styles[prop].description})
    }
    return def_styles
}