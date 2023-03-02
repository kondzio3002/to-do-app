const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', (task) => {
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });
  socket.on('removeTask', (task) => {
    tasks.splice(tasks.indexOf(task), 1);
    socket.broadcast.emit('removeTask', task);
  });
});