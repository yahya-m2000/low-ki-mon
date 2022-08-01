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


let ZhuTwo
let Flaillord
let renderedSprites
let queue
let battleAnimationId

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()
    ZhuTwo = new Monster(monsters.ZhuTwo) 
    Flaillord = new Monster(monsters.Flaillord)
    renderedSprites = [ZhuTwo, Flaillord]
    queue = []
 
 
    Flaillord.attacks.forEach(attack => {
     const button = document.createElement('button')
     button.innerHTML = attack.name
     document.querySelector('#attacksBox').append(button)
 })
// assigning value to the attack buttons we created
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click',(e)=> {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
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
                    document.querySelector('#userInterface').style.display = 'none'
                    gsap.to('#overlappingDiv',{
                        opacity: 0
                    })
                    battle.initiated = false
                    audio.Map.play()
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
                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv',{
                            opacity: 0
                        })
                        battle.initiated = false
                        audio.Map.play()
                    }
                })
                })
            }
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color

    })
})

 }

function animateBattle () {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
animate()
//initBattle()
//animateBattle()


document.querySelector('#dialogueBox').addEventListener('click',(e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = "none"
})

