console.log('background console test')

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab: any) {
    console.log('tab: ',tab)
}

export {}