const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;
const socketRouter = require("./components/sockets/router");
const playerRouter = require("./components/player/router");
const matchRouter = require("./components/match/router");
const authRouter = require("./components/auth/router");
const tokenRouter = require("./components/token/router");
const socket = require("./components/sockets/socket");
var cors = require('cors')
var bodyParser = require("body-parser");

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use([socketRouter, playerRouter, matchRouter, authRouter, tokenRouter]);

const server = http.createServer(app);

socket.startSocket(server);

server.listen(port, () => console.log(`Listening on port ${port}`));

const fs = require('fs');

const file = fs.createWriteStream("file.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  console.log(typeof response);
});



