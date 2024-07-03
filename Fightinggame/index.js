const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

const gravitiy = 0.7

class Sprite {
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
        if (this.height + this.position.y + this.velocity.y >= canvas.height){
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





const player = new Sprite({
    position:
    {
        x: 0, 
        y: 0
    }, 
    offset:
    {
        x: 0,
        y: 0,
    },
   
    velocity: {
        x:0,
        y:10
    },
    color : 'red'
})

const enemy = new Sprite({
    position: 
    {
        x: 400, 
        y: 100
    },

    offset:
    {
        x: -50,
        y: 0
    },
   
    velocity: {
        x:0,
        y:0
    },
    color: 'blue'
})







const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    }

    }

function rectangularCollision(rectangle1, rectangle2){

    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function decideWinner({player, enemy, timerId}){
    clearTimeout(timerId)
  
    document.querySelector('#displayText').style.display = 'flex'

    if (player.health == enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
        
    }
    else if ( player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
        
    }
    else if (enemy.health > player.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 wins' 

    }


}


let timer = 60
let timerId
function decrease_timer(){
   timerId = setTimeout(decrease_timer, 1000) // called in milliseconds
    if (timer > 0){
        timer--
        document.querySelector('#timer').innerHTML = timer}

        
    }
    if (timer == 0){
        decideWinner({player, enemy})
}

    decrease_timer()



function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //This if statement represents the playermovement
    if (keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 5
    }

     //This if statement represents the enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = 5
    }

    //detecting for collission here

    if (rectangularCollision(player, enemy) && player.isAttacking){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
    }



    if (rectangularCollision(enemy, player) && enemy.isAttacking){
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + "%"
    }

    // end game if a player dies

    if(enemy.health <=0 || player.health <=0 ){
        decideWinner({player, enemy, timerId})

    }
}


animate()

window.addEventListener('keydown', (event) => { // moves player to the right with a velocity of 1
    switch(event.key){
        case 'd': 
            keys.d.pressed = true
            player.lastKey = 'd'
            break

        case 'a': 
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'w': 
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight': 
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowUp': 
            enemy.velocity.y = -20
            break

        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => { //stops player from moving
    switch(event.key){
        //player keys here
        case 'd': 
            keys.d.pressed = false
            break

        case 'a': 
            keys.a.pressed = false
            break

        case 'w': 
            keys.w.pressed = false
            lastKey = 'w'
            break

        //enemy keys below

        case 'ArrowRight': 
            keys.ArrowRight.pressed = false
            break

        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
            
    }
})
