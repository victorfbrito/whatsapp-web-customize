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

var bg_element = document.createElement("div");
bg_element.id = 'WAC_bg_container'
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;z-index:1;'

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

function insertInto(existingNode: any, newNode: any, method: string) {
    if (newNode && newNode.nodeType === Node.ELEMENT_NODE) {
        console.log('isnode')
        existingNode.insertAdjacentHTML( method, newNode.outerHTML )
    } else {
        console.log('!isnode')
        existingNode.insertAdjacentHTML( method, newNode )
    }
}

waitForElm('main').then((elm: any) => {
    console.log('Element is ready');
    insertInto(elm, bg_element, 'beforebegin')
    console.log(elm.textContent);
});

waitForElm('bg_container').then((elm: any) => {
    fetch(chrome.runtime.getURL('backgrounds/rose_lui_lava_lamp/raw.html')).then().then(res => res.text()).then(html => insertInto(elm, html, 'beforeend'))
});

export {}