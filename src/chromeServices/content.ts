import * as styles_data from '../store/root_vars.json'
var app: any;

// chrome.runtime.sendMessage({type: "retrieve_dom"}, function(res) {
//     app = res
// })

export function changeProp(prop: string, val: string) {
    // put 'important' as last param if not working
    app.style.setProperty(prop, val, 'important')
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

console.log(getRootVarValues(styles_data))