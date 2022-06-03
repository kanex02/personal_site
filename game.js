const size = 130,
    speed = 15,
    gravity = 2;

var left = false,
    right = false,
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    ay = 0,
    jumps = 2,
    scrollLocked = false,
    scrollSpeed = 0;

function scrollPage(id) {
    scrollLocked = true
    window.scrollTo({
        top: 0,
        left: window.innerWidth*id,
        behavior: 'smooth'
    });
}

document.addEventListener('keydown', press)
function press(e) {
    scrollLocked = false
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
        right = true
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */){
        left = true
    }
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */){
        if (jumps > 0) {
            dy = -30
            jumps--
        }
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

function gameLoop() {
    var div = document.getElementById("player")
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

    if (!scrollLocked) {
        if (x+size > window.innerWidth*0.85) {
            scrollSpeed = speed
        }

        if (x-size < window.innerWidth*0.05) {
            scrollSpeed = -speed
        }
    }

    window.scrollBy(scrollSpeed, 0)
    scrollSpeed *= 0.9

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