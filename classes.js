class Sprite {
    // Sprite is a variable that will give our sprites properties i.e the position of our sprite in the x & y axis
    // frames represents each frame of a sprite.
        constructor({position, image, frames = { max: 1}, sprites}) {
            this.position = position 
            this.image = image
            this.frames = {...frames, val: 0, elapsed: 0 }
            // for collisions, we need the width of the sprite. this will divide the sprite and get the width, and putting this on the .onload() function will make sure it's available to us.
            this.image.onload = () => {
                this.width = this.image.width / this.frames.max
                this.height = this.image.height
            }
            this.moving = false
            this.sprites = sprites
            this.health = 100
        }
    
        draw() {
        c.drawImage(
            // this will crop the image so we don't have four sprites on screen
            this.image,
            // x co-ord crop. you see how the sprite has 4 images, this will shift the crop horizontally so we grab the next frame of the sprite
            this.frames.val * this.width,
            // y co-ord crop
            0,
            // width
            this.image.width / this.frames.max,
            // height
            this.image.height,
            this.position.x,
            this.position.y,
            // this crops the width of the frame
            this.image.width / this.frames.max,
            // height
            this.image.height,
        )
        if (!this.moving) return
            // if there is a sprite sheet, increment frames.elapsed
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        // so, this condition will only run when elapsed / 10 has a remainder of 0. this will make the animation loop 10 frames per second
        if (this.frames.elapsed % 10 === 0) {
        // if the frame the sprite is currently on is less than the whole sprite sheet - 1, move on to the next frame
        if(this.frames.val < this.frames.max - 1) this.frames.val++
        // else, reset the frame animation (this will keep the animation going)
        else this.frames.val = 0
        }
    }

    attack({attack, recipient}) {
        const tl = gsap.timeline()
        tl.to(this.position, {
            x: this.position.x - 35
        })
        .to(this.position,{
            x: this.position.x + 50, 
            duration: 0.1,
            onComplete:() => {
// Enemy gets Hit
                gsap.to('#enemyHealthBar', {
                    width: this.health - attack.damage + '%'
                })
                gsap.to(recipient.position, {
                    x: recipient.position.x + 20,
                    yoyo: true,
                    repeat: 3,
                    duration: 0.05
                })
            }
        })
        .to(this.position,{
        x: this.position.x
        })
    }
}
class Boundary {
    // in order to create our boundaries to the correct size, we need to increase the size and multiply by the value we zoomed in by. In this case we increased the value by 5.5X (12px * 5.5 = 66)
            static width = 48
            static height = 48
            // constructor is a function that simplifies objects. we can essentially make a present object. in this case, we want to define what makes a boundary.
            constructor ({position}){
                // position of the boundary
                this.position = position
                // width of the boundary
                this.width = 48
                // height of the boundary
                this.height = 48
            }
            draw() {
                // this will change the color of our square
                c.fillStyle = 'rgba(255, 0, 0, 0.2'
                // this will draw out a square
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
                 
            }
        }