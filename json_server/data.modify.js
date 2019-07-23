const market = require('./marketupdate');

// setInterval(
//   async function (){market.f_vals},
//   2000
// );

while (1>0) {
  market.f_vals_post();
  sleep(5000);
}

market.f_vals_put();
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// function promiseState(p) {
//   const t = {};
//   return Promise.race([p, t]), res
//     .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
// }


// settimeout cannot be defined in async.
// setInterval(
//   function () {
//     market.getvals().then((response) => market.updateMarket(response)).then(
//       function (data) {
//         market.pushvals(data[0]).then();
//         // console.log(rep);
//       }
//     );
//   },
//   5000
// );


// async function () {
//   var data = await market.getvals().then((response) => market.updateMarket(response));
//   console.log(data[0]);
// market.postvals(data[0]);
//   .then((response) => console.log(response))
//   .catch(error => console.warn(error));
// io.sockets.emit('changes', data)
// },


// module.exports = function() {
//   setInterval(function () {
//     market.updateMarket();
//     io.sockets.emit('market', market.marketPositions[0]);
//   }, 5000);
//
//   io.on('connection', function (socket) {
//     console.log('a user connected');
//   });
// }


