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


const ZhuTwo = new Monster(monsters.ZhuTwo)
const Flaillord = new Monster(monsters.Flaillord)

const renderedSprites = [ZhuTwo, Flaillord]

Flaillord.attacks.forEach(attack => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
})




function animateBattle () {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
/* animate()
animateBattle() */
const queue = []
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

    queue.push(() => {
        ZhuTwo.attack ({
            attack: attacks.Tackle,
            recipient: Flaillord,
            renderedSprites
            })
        })
    })
})

document.querySelector('#dialogueBox').addEventListener('click',(e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = "none"
})

