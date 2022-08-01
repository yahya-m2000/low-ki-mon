// display enemy sprite images and set where the sprite is going to be positioned on the screen
const monsters = {
    Flaillord: { 
        position: {
        x: 280,
        y: 325
    },
    image: {
        src: './sprites/flaillord.png'
    },
    name: 'Flaillord',
    attacks: [attacks.Tackle, attacks.Fireball]
    },
    ZhuTwo: {
        position: {
        x: 800,
        y: 100,
        },
    image: {
        src: './sprites/ZhuTwo.png'
    },
    isEnemy: true,
    name: 'ZhuTwo',
    attacks: [attacks.Tackle, attacks.Fireball],
        }
}