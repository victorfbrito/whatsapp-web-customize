// ------------- message watcher
function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message received: ', message, sender)
    console.log('message type: ', message.type)
    if (message.type === "change_background") { 
        changeBg(message.path)
    } else if (message.type === "remove_background") {
        removeBg()
    } else if (message.type === "choose_file") { 
        chooseFile(message.path)
    }
    // chrome.storage.local.get('current_styles').then(res => {
        //     loadSavedValues(res.current_styles)
        // })
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
    waitForElm('bg_container').then((elm: any) => {
        fetch(chrome.runtime.getURL(url)).then(res => res.text()).then(html => insertInto(elm, html, 'beforeend'))
    });
}

// ------------- changes background
async function changeBg(new_bg: any) {
    removeBg()
    addBackground('backgrounds/' + new_bg + '/index.html')
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
        changeBg(path);
        return('fileChooser clicked')
    }, false);

    /* Wrap it in a form for resetting */
    var form = document.createElement('form');
    form.appendChild(fileChooser);

    fileChooser.click();
}

// ------------- removes background
function removeBg() {
    document.getElementById('bg_container')!.innerHTML = ''
}

// ------------- creates background div when WhatsApp loads
var bg_element = document.createElement("div");
bg_element.id = 'bg_container'
bg_element.style.cssText = 'width:100%;height:100%;position:fixed;z-index:1;background-color: #121212'

// ------------- adds chrome message listener
chrome.runtime.onMessage.addListener(gotMessage)

// ------------- insert bg container when page loads
waitForElm('main').then((elm: any) => {
    insertInto(elm, bg_element, 'beforebegin')
});

export {}