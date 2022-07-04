// Added to and finalized by Philip Case for the MIT XPro Full Stack Developer class July 2022

let  pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
let direction = 0;
const pacMen = []; // staging array for all the factory created pacMen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'PacMan1.png';
    newimg.width = 100;
   newimg.style.left = position.x;
   newimg.style.top = position.y;

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    setTimeout(update, 20);
}

function checkCollisions(item) {
    if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
    if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

function makeOne() {
pacMen.push(makePac()); // add a new PacMan
}


// makes PacMan chomp and faces them direction of movement
let toggle = false;
function imageChange() {
    let img1 = pacArray[0][0]
    let img2 = pacArray[0][1]
    let img3 = pacArray[1][0]
    let img4 = pacArray[1][1]

    pacMen.forEach((pacMan) => {
        if(pacMan.velocity.x > 0) {
            pacMan.newimg.src = toggle ? img1 : img2;
            toggle=!toggle;
            }

        else {
            pacMan.newimg.src = toggle ? img3 : img4;
            toggle=!toggle;
        }
        })
    }

setInterval(imageChange, 200);