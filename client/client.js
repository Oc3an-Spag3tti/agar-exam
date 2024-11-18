let socket = io.connect();
var w = window.innerWidth;
var h = window.innerHeight;

let players = {};
let foods = {};
let myPlayerId = null;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(220);

  let player = players[myPlayerId];

  if (!player) {
    return;
  }

  let scaleFactor = 100 / player.radius;

  scaleFactor = constrain(scaleFactor, 0.5, 2);

  let translateX = width / 2 - player.x * scaleFactor;
  let translateY = height / 2 - player.y * scaleFactor;

  for (let id in players) {
    let otherPlayer = players[id];
    if (otherPlayer.color) {
      fill(otherPlayer.color);
    }
    let otherPlayerSize = otherPlayer.radius * 2 * scaleFactor;
    ellipse(
      otherPlayer.x * scaleFactor + translateX,
      otherPlayer.y * scaleFactor + translateY,
      otherPlayerSize
    );
  }

  for (let id in foods) {
    let food = foods[id];
    if (food.color) {
      fill(food.color);
    }
    let foodSize = food.radius * 2 * scaleFactor;
    ellipse(
      food.x * scaleFactor + translateX,
      food.y * scaleFactor + translateY,
      foodSize
    );
  }
}

setInterval(() => {
  console.log(players);
  console.log("my cell: ", players[myPlayerId]);
}, 5000);

socket.on("welcome", (data) => {
  myPlayerId = data.id;
  console.log(myPlayerId);
});

socket.on("update", (data) => {
  let myCurrentPlayer = players[myPlayerId];

  players = data.players;
  foods = data.foods;

  if (myCurrentPlayer) {
    players[myPlayerId].x = myCurrentPlayer.x;
    players[myPlayerId].y = myCurrentPlayer.y;
  }
});

function createVector(x, y) {
  return { x: x, y: y };
}
let velocity = createVector(0, 0);

function mouseMoved() {
  let player = players[myPlayerId];
  if (player) {
    velocity = createVector(mouseX - 400, mouseY - 300);
    velocity.limit(5);

    player.x += velocity.x;
    player.y += velocity.y;

    socket.emit("update", player);
  }
}
