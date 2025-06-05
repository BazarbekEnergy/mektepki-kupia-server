const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', socket => {
  console.log('Жаңа ойыншы:', socket.id);

  const roles = ["Мафия", "Ұстаз", "Оқушы", "Оқушы", "Оқушы"];
let usedRoles = [];

socket.on('join', (name) => {
  let assignedRole;
  if (usedRoles.length >= roles.length) {
    assignedRole = "Оқушы"; // запас рөл
  } else {
    assignedRole = roles[usedRoles.length];
    usedRoles.push(assignedRole);
  }
  console.log(`${name} қосылды. Рөлі: ${assignedRole}`);
  socket.emit('joined', assignedRole);
});

  socket.on('send-message', msg => io.emit('receive-message', msg));
  socket.on('disconnect', () => console.log('Ойыншы шықты:', socket.id));
});

server.listen(10000, () => console.log('Сервер 10000 портта жұмыс істеп тұр'));
