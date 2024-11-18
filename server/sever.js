const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Player = require("./Player");
const Food = require("./Food");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const io = socketIo(server);

let players = {};
let foods = {};

const WIDTH = 800;
const HEIGHT = 600;
const MAX_FOOD = 100;

let foodId = 0;
let initialRadius = 50;

function createFood(x, y) {
  let id = foodId++;
  let radius = 5;
  let color = "red";

  let food = new Food(id, x, y, radius, color);
  foods[id] = food;
}

for (let i = 0; i < MAX_FOOD; i++) {
  let x = Math.floor(Math.random() * WIDTH);
  let y = Math.floor(Math.random() * HEIGHT);
  createFood(x, y);
}

const checkCollision = (a, b) => {
  const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  return distance < a.radius + b.radius;
};

const handlePlayerFoodCollision = (player, food) => {
  if (checkCollision(player, food)) {
    player.radius += 1;

    delete foods[food.id];

    foods[uuidv4()] = new Food();
  }
};

const handlePlayerPlayerCollision = (player, o_player) => {
  if (checkCollision(player, o_player)) {
    if (player.radius > o_player.radius) {
      player.radius += o_player.radius;
      delete players[o_player.id];
    } else if (player.radius < o_player.radius) {
      o_player.radius += player.radius;
      delete players[player.id];
    }
  }
};

io.on("connection", (socket) => {
  console.log("New client connected");
  players[socket.id] = new Player(
    socket.id,
    Math.random(WIDTH),
    Math.random(HEIGHT),
    initialRadius,
    "blue"
  );
  console.log(players[socket.id]);

  socket.emit("welcome", { id: socket.id });

  socket.on("update", (playerData) => {
    if (players[socket.id]) {
      players[socket.id] = playerData;
    }

    let player = players[socket.id];

    for (let id in foods) {
      let food = foods[id];
      handlePlayerFoodCollision(player, food);
    }

    for (let id in players) {
      if (id === socket.id) continue;
      let otherPlayer = players[id];
      handlePlayerPlayerCollision(player, otherPlayer);
    }

    io.sockets.emit("update", { players, foods });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete players[socket.id];
  });
});
setInterval(() => {
  io.sockets.emit("update", { players, foods });
}, 1000 / 60);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server listening on port ${port}`));

setInterval(() => {
  createFood();
  Object.keys(players).map((key) => {
    let player = players[key];
    createFood(
      player.x + Math.random() * 4 * WIDTH - WIDTH * 2,
      player.y + Math.random() * 4 * HEIGHT - HEIGHT * 2
    );
  });
}, 50);
