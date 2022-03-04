chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    if (message.type === "change_background") {
        console.log('message type: change background')
    } else if (message.type === "remove_background") {
        console.log('message type: remove background')
        // chrome.storage.local.get('current_styles').then(res => {
        //     loadSavedValues(res.current_styles)
        // })
    }
}

// function changeProp(prop: string, val: string) {
//     // put 'important' as third param if not working
//     document.documentElement.style.setProperty(prop, val)
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

// ------------- creates background div when WhatsApp loads
var bg_element = document.createElement("div");
bg_element.id = 'bg_container'
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;z-index:1;'

// ------------- waits for element to appear
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

// ------------- insert element in given position
function insertInto(existingNode: any, newNode: any, method: string) {
    if (newNode && newNode.nodeType === Node.ELEMENT_NODE) {
        console.log('isnode')
        existingNode.insertAdjacentHTML( method, newNode.outerHTML )
    } else {
        console.log('!isnode')
        existingNode.insertAdjacentHTML( method, newNode )
    }
}

// ------------- add background
function addBackground(url: string) {
    waitForElm('bg_container').then((elm: any) => {
        fetch(chrome.runtime.getURL(url)).then(res => res.text()).then(html => insertInto(elm, html, 'beforeend'))
    });
}

waitForElm('main').then((elm: any) => {
    console.log('Element is ready');
    insertInto(elm, bg_element, 'beforebegin')
    console.log(elm.textContent);
});

addBackground('backgrounds/beep_ghost/raw.html')


export {}