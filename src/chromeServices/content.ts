// ------------- message watcher
function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    if (message.type === "change_background") { 
        console.log('message type: change background')
        changeBg(message.path)
    } else if (message.type === "remove_background") {
        console.log('message type: remove background')
        removeBg()
        // chrome.storage.local.get('current_styles').then(res => {
        //     loadSavedValues(res.current_styles)
        // })
    }
}

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
    console.log('element: ',bg_element)
    // bg_element.innerHTML = ''
    waitForElm('bg_container').then((elm: any) => {
        fetch(chrome.runtime.getURL(url)).then(res => res.text()).then(html => insertInto(elm, html, 'beforeend'))
    });
}

// ------------- changed background
async function changeBg(new_bg: any) {
    removeBg()
    addBackground('backgrounds/' + new_bg + '/index.html')
}

// ------------- remove background
function removeBg() {
    document.getElementById('bg_container')!.innerHTML = ''
}

// ------------- creates background div when WhatsApp loads
var bg_element = document.createElement("div");
bg_element.id = 'bg_container'
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;z-index:1;'

// ------------- adds message listener
chrome.runtime.onMessage.addListener(gotMessage)

// ------------- insert bg container when page loads
waitForElm('main').then((elm: any) => {
    insertInto(elm, bg_element, 'beforebegin')
});

export {}