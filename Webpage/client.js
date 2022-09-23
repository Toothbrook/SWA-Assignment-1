const { response } = require('express')
const express = require('express')
const fetch = require('node-fetch')
const WebSocket = require('ws')

const web_service_port = 9696
const web_socket_port = 8096

const app = express()
app.use(express.json())
app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, User-Agent");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});
app.get('/home', async(req,res) => {const url =
    'http://localhost:8080/data';
const options = {
    method: 'GET'
};
// promise syntax
/*fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));*/
try {
    let response = await fetch(url, options);
    response = await response.json();
    console.log("do we get here")
    res.status(200).json(response);
} catch (err) {
    console.log(err);
    res.status(500).json({msg: `Internal Server Error.`});
}
});

app.use(express.static('static'));
let start_time = new Date();

const wss = new WebSocket.Server({ port: web_socket_port, path: '/warnings' });

app.listen(web_service_port, () => console.log("Server started on", web_service_port, "at", start_time.toString()));
