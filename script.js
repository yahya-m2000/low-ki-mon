const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720
console.log(context)

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)