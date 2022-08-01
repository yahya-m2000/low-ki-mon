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


let battleAnimationId

function animateBattle () {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
//animate()
// animateBattle()
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

        if (ZhuTwo.health <= 0) {
            queue.push(() => {
                ZhuTwo.faint()
            })
        queue.push(() => {
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    cancelAnimationFrame(battleAnimationId)
                    animate()
                }
            })
            })
        }
        //enemy attack here
        const randomAttack = 
            ZhuTwo.attacks[Math.floor(Math.random() * ZhuTwo.attacks.length)]

    queue.push(() => {
        ZhuTwo.attack ({
            attack: randomAttack,
            recipient: Flaillord,
            renderedSprites
            })
        
        if (Flaillord.health <= 0) {
                queue.push(() => {
                    Flaillord.faint()
                })
            }
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color

        console.log('')
    })
})

document.querySelector('#dialogueBox').addEventListener('click',(e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = "none"
})

