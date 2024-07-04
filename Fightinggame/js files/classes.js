class Sprite {
    constructor({position, image_src, scale = 1, framesmax = 1}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image() //native API which creates an HTML image using javascript
        this.image.src = image_src
        this.scale = scale
        this.framesmax = framesmax
        this.framesCurrent = 0
        this.frames_passed = 0
        this.frames_hold = 10
    }
    draw() {
        c.drawImage(this.image, this.framesCurrent *(this.image.width/ this.framesmax), 0, this.image.width / this.framesmax, this.image.height, this.position.x, this.position.y, (this.image.width/this.framesmax) * this.scale, this.image.height*this.scale)
        
}

    update(){ // creating movement for our characters in the game
        this.draw()
        this.frames_passed++
        if (this.frames_passed % this.frames_hold == 0){
            if (this.framesCurrent < this.framesmax -1){
                this.framesCurrent++
             }else{
                this.framesCurrent = 0
        }
    }
}

    }

    class Fighter {
        constructor({position, velocity, color, offset}){
            this.position = position
            this.velocity = velocity
            this.height = 150
            this.width = 50
            this.lastKey
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                width: 100,
                height: 50,
                offset,
            }
            this.color = color
            this.isAttacking
            this.health = 100
        }
        draw() {
            
            c.fillStyle = this.color
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
    
            //this is where i'm drawing the attackBox
            if (this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    
    
    }
    
        update(){ // creating movement for our characters in the game
            this.draw()
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y
    
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y // moves around pixels in the y position
            if (this.height + this.position.y + this.velocity.y >= canvas.height - 96){
                this.velocity.y = 0
            } else this.velocity.y += gravitiy
        }
    
    
            attack(){
                this.isAttacking = true
                setTimeout(() => {
                    this.isAttacking = false
                }, 100)
            }
        }
