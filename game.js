emailLink = document.getElementById('email')
emailLink.addEventListener("click", copyThis)
emailLink.value = 'kanexie04@gmail.com'

function copyThis(e) {
    navigator.clipboard.writeText(e.currentTarget.value)

    alert = document.getElementById('alert')
    alert.style.left = e.clientX+'px'
    alert.style.top = e.clientY+'px'
    alert.innerHTML = 'Copied!'
    alert.style.display = 'block'
    setTimeout(() => {alert.style.display = 'none'}, 500)
}


/*Interactive code below*/
const speed = 15,
    gravity = 2;

var size = 130,
    left = false,
    right = false,
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    ay = 0,
    jumps = 2,
    scrollLocked = true,
    scrollSpeed = 0
    clone = undefined;

function scrollPage(id) {
    scrollLocked = true
    if (id === 2) {
        window.scrollTo({
            top: 0,
            left: window.innerWidth*1.8,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0,
            left: window.innerWidth*id,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('keydown', press)
function press(e) {
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        right = true
        scrollLocked = false
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
        left = true
        scrollLocked = false
    }
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
        scrollLocked = false
        if (jumps > 0) {
            dy = -30
            jumps--
        }
    }
    if (e.keyCode === 70 /* f */) {
        scrollLocked = true
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('keyup', release)
function release(e) {
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
        right = false
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */){
        left = false
    }
}

document.addEventListener('mousedown', clicked)
function clicked(e) {
    document.body.style.cursor = 'default'
    if (e.button === 1) {
        copyInstructions(e)
    }
}

document.addEventListener('wheel', copyInstructions)
function copyInstructions(e) {
    clones = document.getElementsByClassName('clone')
    while (clones[0]) {
        clones[0].remove()
    }
    clone = document.getElementById('instructions').cloneNode(true)
    clone.style.position = 'fixed'
    clone.style.top = e.clientY+'px'
    clone.style.left = e.clientX+'px'
    clone.style.margin = 0
    clone.style.zIndex = 100
    clone.classList.add('clone')
    document.getElementById('home').appendChild(clone)
    setTimeout(() => clone.remove(), 1000)
}

function gameLoop() {
    var div = document.getElementById("player")
    size = window.innerHeight/10
    if (x + dx > window.innerWidth - 2*size) {
        x = window.innerWidth - 2*size
        dx = 0
    } else if (x + dx < 0.5*size) {
        x = 0.5*size
        dx = 0
    } else {
        x = x + dx
    }

    if (y + dy > window.innerHeight - 1.2*size) {
        y = window.innerHeight - 1.2*size
        dy = -dy*0.5
        jumps = 2
    } else if (y + dy < 0.5*size) {
        y = 0.5*size
        dy = 0
    } else {
        y = y + dy
    }

    if (x+size > window.innerWidth*0.85) {
        scrollSpeed = speed
    }

    if (x-size < window.innerWidth*0.05) {
        scrollSpeed = -speed
    }

    if (!scrollLocked && Math.abs(scrollSpeed) > 1) {
        window.scrollBy(scrollSpeed, 0)
    }
    
    scrollSpeed = scrollSpeed*0.9

    dx = dx * 0.92
    dy = dy + gravity

    if (right) {
        dx = speed
    }
    if (left) {
        dx = -speed
    }
    div.style.left = x+'px'
    div.style.top = y+'px'
    window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)