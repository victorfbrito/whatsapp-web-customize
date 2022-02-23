export function changeColor() {
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

changeColor()