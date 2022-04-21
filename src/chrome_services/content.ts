chrome.runtime.onMessage.addListener(gotMessage)
  
// ------------- message watcher
function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    console.log('message type: ', message.type)
    if (message.type === "change_background") { 
        changeBg(message.path, message.bg_type)
    } else if (message.type === "remove_theme") {
        removeBg()
    } else if (message.type === "choose_file") { 
        chooseFile(message.path)
    } else if (message.type === "change_root_variables") {
        setVariables(message.content)
    }
    sendResponse({message: 'message received, sending response'})
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

// ------------- insert custom variables in the html
function setVariables(list: any) {
    if (list.length === 0) return 
    for ( var i = 0; i < list.length; i++ ) {
        document.documentElement.style.setProperty(`--wac_custom_var_${i}`, list[i])
    }
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
function addBackground(path: string) {
    waitForElm('bg_container').then((elm: any) => {
        fetch(chrome.runtime.getURL(path)).then(res => res.text()).then(html => insertInto(elm, html, 'beforeend'))
    });
}

// ------------- changes background
async function changeBg(new_bg: any, bg_type: string) {
    removeBg()
    console.log('new bg type: ', bg_type)
    addBackground('backgrounds/' + bg_type + '/' + new_bg + '/index.html')
}

// ------------- changes background
async function chooseFile(path: string) {
    var fileChooser = document.createElement('input');
    fileChooser.type = 'file';

    fileChooser.addEventListener('change', function () {
        var file = fileChooser.files![0];

        var reader = new FileReader();
        reader.onload = function(){
            var data = 'test'
            data = typeof reader.result === 'string' ? reader.result : 'empty_data';
            document.documentElement.style.setProperty('--custom-image-src', 'url(' + data + ')')
        };
        reader.readAsDataURL(file);
        form.reset();
        changeBg(path, 'static');
        return('fileChooser clicked')
    }, false);

    /* Wrap it in a form for resetting */
    var form = document.createElement('form');
    form.appendChild(fileChooser);

    fileChooser.click();
}

// ------------- removes background
function removeBg() {
    console.log('removing bg')
    document.getElementById('bg_container')!.innerHTML = ''
}

// ------------- removes data from storage
function clearStorage() {
    chrome.storage.local.set({'selected_variables': null})
    chrome.storage.local.set({'selected_theme': null})
}

// ------------- removes (apparently unnecessary) scale-x transform for overlaying prevention 
function clearTransform() {
    document.styleSheets[0].insertRule("div#main { transform: none !important; }", 0)
}

// ------------- creates background div when WhatsApp loads
var bg_element = document.createElement("div");
bg_element.id = 'bg_container'
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;z-index:1;background-color: #121212'

// ------------- adds chrome message listener
// chrome.runtime.onMessage.addListener(gotMessage)

// ------------- insert bg container when page loads
waitForElm('main').then((elm: any) => {
    elm.setAttribute('style', 'color: red')
    clearTransform()
    insertInto(elm, bg_element, 'beforebegin')
});

waitForElm('bg_container').then((elm: any) => {
    chrome.storage.local.get('selected_variables').then( e => {
            console.log('found variables: ', e)
            setVariables(e.selected_variables)  
        }
    )
    chrome.storage.local.get('selected_theme').then( e => {
        console.log('found theme: ', e)
        changeBg(e.selected_theme.path, e.selected_theme.type)  
        }
    )
});

export {}