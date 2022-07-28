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

const boundaries = []
const offset = {
    x: -500,
    y: -300
}

// the row argument goes over the array in collisions.js using the forEach loop, and the i represents the index of the row we're going over. so the 1st array is 0, the 2nd is 1, etc.
// row.forEach will loop within each of the row. j is the index of symbol.
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // 1025 is the boundary. so, if symbol is equal to 1025, then the condition passes
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
const playerImageDown = new Image()
playerImageDown.src = './img/playerDown.png'
const playerImageUp = new Image()
playerImageUp.src = './img/playerUp.png'
const playerImageLeft = new Image()
playerImageLeft.src = './img/playerLeft.png'
const playerImageRight = new Image()
playerImageRight.src = './img/playerRight.png'
 
const image = new Image() 
image.src = './img/Map.png'


    //  this will position what is being rendered on the screen
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192/ 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImageDown,
    // this will change the max on this.frames.max on line 89 to 4, so it'll render out one sprite
    frames: {
        max: 4
    },
    sprites: {
        up: playerImageUp,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
    }
})

const background = new Sprite({position:{
    x: offset.x,
    y: offset.y
    
    },
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

// this variable will be an array that consists of all the items we want to move on our map
const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate () {
window.requestAnimationFrame(animate) // This a recursive function and will loop through over and over again to begin editing the object properties 
background.draw()
boundaries.forEach((boundary) => {
    boundary.draw()

})
player.draw()

    // if the w key is pressed & if it's the last key pressed, background.position.y will move the background upwards giving the illusion the character sprite is moving
    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
                if (
                    rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
                ) {
                    console.log('colliding')
                    moving = false
                    break
                } 
            
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }
    // if the a key is pressed & if it's the last key pressed, background position.x will move the background sideways giving the illusion the character is moving
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
                if (
                    rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        }
                    }
                })
                ) {
                    console.log('colliding')
                    moving = false
                    break
                } 
            
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's'){
        player.moving = true
        player.image = player.sprites.down

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
                if (
                    rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        }
                    }
                })
                ) {
                    console.log('colliding')
                    moving = false
                    break
                } 
            
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd'){
        player.moving = true
        player.image = player.sprites.right

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
                if (
                    rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        }
                    }
                })
                ) {
                    console.log('colliding')
                    moving = false
                    break
                } 
            
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    
    }
    
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
})