export function findEl() {
    try {
        var el = document.getElementById('search')
        console.log('found el: ',el)
        if (el) el.style.backgroundColor = "blue"
    }catch {
        console.log('error')
    }
}

export function addNumber(x: Number) {
    chrome?.storage?.sync.set({'selected_number': x}, function() {
        console.log('Value is set to ' + x);
      })
}

export function changeColor(color: string) {
    var app = document.documentElement
    console.log('app element: ', app)
    console.log('new color: ',color)
    // put 'important' as last param if not working
    app.style.setProperty('--conversation-panel-background',color, 'important')
}

findEl()
changeColor('aquamarine')

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message: ',message)
    console.log('sender: ',sender)
    console.log('sendResponse: ',sendResponse)
}