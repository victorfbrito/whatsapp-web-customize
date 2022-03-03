import * as styles_data from '../store/root_vars.json'

var app: any;
// chrome.runtime.onMessage.addListener(gotMessage)

// function gotMessage(message: any, sender: any, sendResponse: any) {
//     console.log('message received: ', message, sender)
//     if (message.type === "change_prop") {
//       console.log('changing prop')
//       changeProp(message.var_name, message.val)
//     } else if (message.type === "cancel_changes") {
//         chrome.storage.local.get('current_styles').then(res => {
//             loadSavedValues(res.current_styles)
//         })
//     } else if (message.type === "reset_styles") {
//         resetValues()
//     }
// }

// function changeProp(prop: string, val: string) {
//     // put 'important' as third param if not working
//     document.documentElement.style.setProperty(prop, val)
// }

// function getRootVarValues(styles: any) {
//     var def_styles : any = []
//     const app = getComputedStyle(document.documentElement)
//     for (const prop in styles) {
//         const res = app.getPropertyValue(styles[prop].name)
//         if (styles[prop].name) def_styles.push({name: styles[prop].name, original_val: res, val: res, desc: styles[prop].description})
//     }
//     console.log('styles: ', def_styles)
//     return def_styles
// }

// function loadSavedValues(list: any[]) {
//     for (const prop in list) {
//         changeProp(list[prop].name, list[prop].val)
//     }
// }

// function resetValues() {
//     chrome.storage.local.get('current_styles').then(res => {
//         res.current_styles.forEach((e: any) => e['val'] = e.original_val)
//         return res.current_styles
//     }).then(res => {
//         chrome.storage.local.set({'current_styles': res}).then(() => 
//             chrome.runtime.sendMessage({type: "send_styles"}, function(res) {
//                 console.log('message sent')
//             })
//         )
//     })
// }


// if (document.URL === 'https://web.whatsapp.com/'){
//     chrome.storage.local.get('current_styles').then(res => {
//         if (Array.isArray(res.current_styles)) {
//             console.log('existing data')
//            loadSavedValues(res.current_styles)
//         } else {
//             console.log('non-existing data')
//             chrome.storage.local.set({'current_styles': getRootVarValues(styles_data)}).then(() => 
//             chrome.runtime.sendMessage({type: "send_styles"}, function(res) {
//                 console.log('message sent')
//             })
//         )
//         }
//     })
// }

const bg_element = document.createElement("div");
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;'

function waitForElm(selector: any) {
    return new Promise(resolve => {
        if (document.getElementById(selector)) {
            return resolve(document.getElementById(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.getElementById(selector)) {
                resolve(document.getElementById(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function insertInto(existingNode: any, newNode: any) {
    console.log('inserting into: ', existingNode)
    console.log('content: ', newNode)
    existingNode.appendChild(newNode)
}

waitForElm('main').then((elm: any) => {
    console.log('Element is ready');
    insertInto(elm, bg_element)
    console.log(elm.textContent);
});