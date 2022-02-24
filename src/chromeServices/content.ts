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

export function changeProp(prop: string, val: string) {
    var app = document.documentElement
    console.log('app element: ', app)
    console.log('new color: ',val)
    // put 'important' as last param if not working
    app.style.setProperty(prop, val, 'important')
}

findEl()

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message: any, sender: any, sendResponse: any) {
    console.log('message: ',message)
    console.log('sender: ',sender)
    console.log('sendResponse: ',sendResponse)

    if (message.change_prop) {
        changeProp(message.change_prop.prop, message.change_prop.val)
    }
}