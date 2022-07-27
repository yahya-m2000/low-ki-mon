const canvas = document.querySelector('canvas');
// get(2d) will give us a whole api of canvas, and '2d' will give us a 2d api
const c = canvas.getContext('2d')

// the resolution of the game
canvas.width = 1280
canvas.height = 720
console.log(c)
// fills the canvas with white
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, 
    canvas.height)
// declare image variables that will contain image assets
const playerImage = new Image()
playerImage.src = './img/playerDown.png'
 
const image = new Image() 
image.src = './img/Map.png'

class Sprite {
// Sprite is a variable that will give our sprites properties i.e the position of our sprite in the x & y axis
    constructor({position, velocity, image}) {
        this.position = position 
        this.image = image 
    }

    draw() {
        // drawImage will render the image variable (if you see on line 18 it contains the Map.png, so it'll render the background out)
        c.drawImage(this.image, this.position.x, this.position.y )//(this.image, -335, -690, 4000, 4000 * image.height / image.width)
    }
}

const background = new Sprite({position:{
    x: -785,
    y: -690, 
    
    },
    // when Sprite runs, image: image will first run, then line 24 (this.image = image) and then line 27 (draw())
    image: image
})

const keys = {
    w: {
        // key is not pressed by default, so it should evalute to false
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }


}

function animate () {
window.requestAnimationFrame(animate) // This a recursive function and will loop through over and over again to begin editing the object properties 
background.draw()
    c.drawImage(
        // this will crop the image so we don't have four sprites on screen
        playerImage,
        // x co-ord 
        0,
        // y co-ord
        0,
        // width
        playerImage.width / 4,
        // height
        playerImage.height,

        //  this will position what is being rendered on the screen
        canvas.width / 2 - playerImage.width / 4 / 2, 
        canvas.height / 2 - playerImage.height / 2,
        // width
        playerImage.width / 4,
        // height
        playerImage.height,
    )
    
    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
    
}
animate()

// addEventListener('keydown') will work whenever you press a key
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {

        case 'w': // w will evaluate to true if it's pressed
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            // w will evaluate to false when you lift up off the key
            keys.w.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 's':
            keys.s.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break
    }
    console.log(keys)
})