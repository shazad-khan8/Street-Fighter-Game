const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

const gravitiy = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    image_src: './Fighting Game Assests/background.png'


})

const shop = new Sprite({
    position: {
        x: 600,
        y:128
    },
    image_src: './Fighting Game Assests/shop.png',
    scale: 2.75,
    framesmax: 6


})




const player = new Fighter({
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

const enemy = new Fighter({
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


    decrease_timer()



function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
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
