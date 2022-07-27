const canvas = document.querySelector('canvas');
// get(2d) will give us a whole api of canvas, and '2d' will give us a 2d api
const c = canvas.getContext('2d')


// the resolution of the game
canvas.width = 1024
canvas.height = 576

// creating a for loop to iterate the collision items and adding items to another array in increments of 70 because our map is 70 tiles wide. This will allow us to create our boundaries within the map and force the character to not pass through.
const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 70) {
// slicing every element collisions and then pushing our array into a new array (collisionsMap)    
    collisionsMap.push(collisions.slice(i, 70 + i))
}
// to create canvas objects placed in their exact position by using the position value we received earlier
class Boundary {
// in order to create our boundaries to the correct size, we need to increase the size and multiply by the value we zoomed in by. In this case we increased the value by 5.5X (12px * 5.5 = 66)
    static width = 66
    static height = 66
    constructor ({position}){
        this.position = position
        this.width = 66
        this.height = 66
    }
// using the x and y position we are able to draw a square
    draw() {
// using the canvas 
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
         
    }
}

const boundaries = []
const offset = {
    x: -390,
    y: -750
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(new Boundary(
            {position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
} )

console.log(boundaries)
  

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
        // this.(grab the position of the x axis on the background const)
        c.drawImage(this.image, this.position.x, this.position.y )
    }
}



const background = new Sprite({position:{
    x: offset.x,
    y: offset.y
    
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
boundaries.forEach(boundary => {
    boundary.draw()
})
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
    // if the w key is pressed & if it's the last key pressed, background.position.y will move the background upwards giving the illusion the character sprite is moving
    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    // if the a key is pressed & if it's the last key pressed, background position.x will move the background sideways giving the illusion the character is moving
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

        case 'a': // a will evaluate to true if it's pressed
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's': // s will evaluate to true if it's pressed
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd': // d will evaluate to true if it's pressed
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch ( e.key) {
        case 'w': // w will evaluate to false when you lift up off the key
            keys.w.pressed = false
            break

        case 'a': // a will evaluate to false when you lift up off the key
            keys.a.pressed = false
            break

        case 's': // s will evaluate to false when you lift up off the key
            keys.s.pressed = false
            break

        case 'd': // d will evaluate to false when you lift up off the key
            keys.d.pressed = false
            break
    }
    console.log(keys)
})