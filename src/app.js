const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;
const socketRouter = require("./components/sockets/router");
const playerRouter = require("./components/player/router");
const matchRouter = require("./components/match/router");
const authRouter = require("./components/auth/router");
const tokenRouter = require("./components/token/router");
const socket = require("./components/sockets/socket");
const tTokenRouter = require("./components/tToken/router");
const productRouter = require("./components/products/router");
const orderRouter = require("./components/orders/router");
const tokenCheckerMiddleware = require("./middlewares/tokenChecker");
var cors = require('cors')
var bodyParser = require("body-parser");

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use([socketRouter, playerRouter, matchRouter, authRouter, tokenRouter]);
// app.use('/private', tokenCheckerMiddleware, tTokenRouter, productRouter, orderRouter);
// app.use('/public', orderRouter);

app.use('/api', orderRouter, productRouter);

const server = http.createServer(app);

socket.startSocket(server);

server.listen(port, () => console.log(`Listening on port ${port}`));




