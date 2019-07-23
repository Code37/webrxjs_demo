const baseUrl =  'http://localhost:3000';
const moment = require('moment');
const http = require('http');
const fetch = require('node-fetch');
const request = require('sync-request');

/////////////////////////Below are synchronous/////////////////////////////

function f_vals_post() {
  let req = request('GET', baseUrl + '/marketPositions');
  var data =  updateMarket(JSON.parse(req.body));
  res = request('POST', baseUrl + '/marketPositions/', {
    json: data[data.length - 1],
  });
  return null;
}

/////////////////////////Below are True asynchronous////////////////////////
// Thanks for Quincy's support, PUT will modify all the original data

const axios = require('axios');

async function f_vals_post_asyn ()
{
  for (let i = 0; i < 2; i++) {
    // await getAndPutOnce();
    await new Promise(async (resolve) => {
      const response = await axios.get(baseUrl + '/marketPositions');
      const data = updateMarket(response.data);
      // console.log(data);
      // var f = {};
      // Object.assign(f, data[data.length - 1]);
      // f.age = f.age + 1;
      // data.push(f);
      await axios.post(baseUrl + '/marketPositions/', data[data.length - 1]);
      resolve();
    });
  }
}

/////////////////////////Below are sort of synchronous////////////////////////

function getvals_http(){
  let data = '';

  var req = http.get(baseUrl + '/marketPositions', (resp) => {

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // console.log(JSON.parse(data));
      return JSON.parse(data);
    });

  }).on("error", (err) => {
    // console.log("Error: " + err.message);
  });

  req.end();
}

function postvals_http(data){

  var options = {
    host: baseUrl,
    path: '/marketPositions',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => {process.stdout.write(d)})
  });

  req.on('error', (error) => {
    console.error(error)
  });
  req.write(data);
  req.end();
}

/////////////////////////Below are asynchronous/////////////////////////////

function getvals(){
  return fetch(baseUrl + '/marketPositions',
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      return responseData;
    })
    .catch(error => console.warn(error));
}

// Example POST method implementation:

function pushvals(data) {
  // Default options are marked with *
  // console.log(data)
  return fetch(baseUrl + '/marketPositions/', {
    body: JSON.stringify(data), // must match 'Content-Type' header
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, same-origin, *omit
    headers: {
    //   'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
    .then(response => console.log(response.json())) // parses response to JSON
}


let counter = 0;



function updateMarket(marketPositions) {
  // console.log("marketPositions:"+typeof marketPositions+marketPositions);
  const diff = Math.floor(Math.random() * 1000) / 100;
  const lastDay = moment(marketPositions[marketPositions.length -1].date, 'YYYY-MM-DD').add(1, 'days');
  let open;
  let close;

  if (counter % 2 === 0) {
    open = marketPositions[marketPositions.length -1].open + diff;
    close = marketPositions[marketPositions.length -1].close + diff;
  } else {
    open = Math.abs(marketPositions[marketPositions.length -1].open - diff);
    close = Math.abs(marketPositions[marketPositions.length -1].close - diff);
  }

  marketPositions.push({
    close,
    date: lastDay.format('YYYY-MM-DD'),
    id: parseInt(lastDay.format('YYYYMMDD')),
    open
  });
  counter++;
  return marketPositions
}

module.exports = {
  updateMarket,
  getvals,
  pushvals,
  getvals_http,
  postvals_http,
  f_vals_post,
  f_vals_post_asyn
};
