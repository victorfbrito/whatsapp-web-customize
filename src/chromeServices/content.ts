export function changeColor() {
    try {
        var el = document.getElementById('search')
        console.log('found el: ',el)
        if (el) el.style.backgroundColor = "blue"
    }catch {
        console.log('error')
    }
}

changeColor()