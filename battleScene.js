// displays the background image once we enter battle
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position:{
    x: 0,
    y: 0
},
image: battleBackgroundImage
})

// display enemy sprite images and set where the sprite is going to be positioned on the screen
const ZhuTwoImage = new Image()
ZhuTwoImage.src = './sprites/ZhuTwo.png'
const ZhuTwo = new Sprite({
    position: {
    x: 800,
    y: 100,
    },
image: ZhuTwoImage,
isEnemy: true,
name: 'ZhuTwo'
    })

// display user sprite images and set where the sprite is going to be positioned on the screen
const FlaillordImage = new Image()
FlaillordImage.src = './sprites/flaillord.png'
const Flaillord = new Sprite({
    position: {
    x: 280,
    y: 325
},
image: FlaillordImage,
name: 'Flaillord'
})

const renderedSprites = [ZhuTwo, Flaillord]
function animateBattle () {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
animate()

// assigning value to the attack buttons we created
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click',(e)=> {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        console.log(selectedAttack)
        Flaillord.attack ({
        attack: selectedAttack,
        recipient: ZhuTwo,
        renderedSprites
        })
    })
})

document.querySelector('#dialogueBox').addEventListener('click',(e) => {
    e.currentTarget.style.display = "none"
    console.log("clicked dialogue")
})

