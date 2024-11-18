const express = require('express');
const http = require('http');
const {SocketIo} = require('socket.io');
import Food from './Food';
import Player from './Player';
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = SocketIo(server);

let players = {};
let cells = {};

let foodId = 0;
let initalRadius = 50;

const createFood = (x, y) => {
    let id = foodId++;
    let radius = 5;
    let color = "blue"
    
    let food = new Food(id, x, y, radius, color);
    foods[id] = food;

}

for (let i = 0; i < 100; i++) {
    let x = Math.floor(Math.random() * 1000);
    let y = Math.floor(Math.random() * 1000);
    createFood(x, y);
    
}

const checkCollision = (A, B) => {
    let dx = A.x - B.x;
    let dy = A.y - B.y;
    const distance = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
    return distance < A.radius + B.radius;
}

const HandleFoodCollision = (player, food) => {
    if (checkCollision(player, food)) {
        player.radius += 1;
        delete foods[food.id];
    }

    foods[uuidv4()] = new Food();
}



