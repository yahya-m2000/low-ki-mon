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
// declare image variables that will contain image assests
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const image = new Image()
image.src = './img/Map.png'
image.onload = () => {
    c.drawImage(image, -335, -690, 4000, 4000 * image.height / image.width)
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
}

// addEventListener('keydown') will work whenever you press a key
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            console.log('pressed w key')
            break
        case 'a':
            console.log('pressed a key')
            break
        case 's':
            console.log('pressed s key')
            break
        case 'd':
            console.log('pressed d key')
            break
            case 'ArrowUp':
            console.log('pressed up key')
            break
    }
})