// display enemy sprite images and set where the sprite is going to be positioned on the screen
const ZhuTwoImage = new Image()
ZhuTwoImage.src = './sprites/ZhuTwo.png'
const FlaillordImage = new Image()
FlaillordImage.src = './sprites/flaillord.png' 
const monsters = {
    Flaillord: { 
        position: {
        x: 280,
        y: 325
    },
    image: FlaillordImage,
    name: 'Flaillord',
    attacks: [attacks.Tackle, attacks.Fireball]
    },
    ZhuTwo: {
        position: {
        x: 800,
        y: 100,
        },
    image: ZhuTwoImage,
    isEnemy: true,
    name: 'ZhuTwo',
    attacks: [attacks.Tackle, attacks.Fireball],
        }
}