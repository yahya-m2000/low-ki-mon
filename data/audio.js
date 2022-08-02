const audio = {
    Map: new Howl({
        src: './audio/bgMusic.mp3',
        html5: true,
        volume: 1
    }),
    initBattle: new Howl({
        src: './audio/innitBattle.wav',
        html5: true,
        volume: 0.1
    }),
    Battle: new Howl({
        src: './audio/battle.mp3.',
        html5: true,
        volume: 0.1
    }),
    tackleHit: new Howl({
        src: './audio/tackleHit.wav',
        html5: true,
        volume: 0.1
    }),
    fireBallHit: new Howl({
        src: './audio/fireBallHit.wav',
        html5: true,
        volume: 0.1
    }),
    initFireBall: new Howl({
        src: './audio/initFireball.wav',
        html5: true,
        volume: 0.1
    }),
    victory: new Howl({
        src: './audio/victory.wav',
        html5: true,
        volume: 0.1
    })
}