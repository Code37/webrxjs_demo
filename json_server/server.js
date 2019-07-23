const baseUrl =  'http://localhost:3000';
const jsonServer = require('json-server');
const express = require('express');
const path = require("path");
// const server = jsonServer.create();
const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const axios = require('axios');
const port = 3000;

// set delay
app.use(function(req, res, next){
  setTimeout(next, 1000);
});

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if ((req.method === 'PUT' && res.url === 'M')) {
//     req.body.id = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// });

// Use default router

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.get('/marketPositions', function (req, res, next) {
//   res.send('GET request to homepage')
//   console.log('Hi');
//
// });

// const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/marketPositions/', upload.array(), function (req, res, next) {
  // console.log('market marketPositions update');
  console.log(req.body);
  // console.log(res);
  // res.send('POST request to homepage')
  io.sockets.emit('market', req.body);
  // res.send({})
  next();
});

app.use(router);


const httpserver = app.listen(port, () => {
  console.log('JSON Server is running');
  console.log('listening on *:' + port);
});

// const io = require('socket.io')(httpserver);
const io = require('socket.io').listen(httpserver, {
  // path: '/marketPositions',
  // serveClient: true,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', function (socket) {
  console.log(`The user ${socket.id} connected`);

  // socket.on('market', function (from, msg) {
  //   console.log('This is a market update:', msg, 'by', from);
  // });

  socket.on('disconnect', () => {
    // console.log(data);
    console.log(`The user ${socket.id} disconnect`)
  });
});

// setInterval(async function (resolve) {
//   const response = await axios.get(baseUrl + '/marketPositions');
//   const data = response.data;
//   console.log(data[data.length -1]);
//   io.sockets.emit('market', data[data.length -1]);
// }, 5000);


Object.keys(router.db.getState())
  .forEach((key) => console.log(`/${key}`));




