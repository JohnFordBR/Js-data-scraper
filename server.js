// const express  = require("express");
// const app = express();
// console.log("ok");
// app.use(express.static("server"));
// app.listen( process.env.PORT  || 8080,()=>{console.log("all is right");});
// app.get('/', function (req, res) {
//   res.send('hello world')
// })
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('gitbook.json')
const middlewares = jsonServer.defaults()

var port = process.env.PORT || 3000;

var basicAuth = require('express-basic-auth')
 
server.use(basicAuth({
    users: { 'no': 'secrets' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse,
}))

function getUnauthorizedResponse(req) {
    return req.auth ?
        {'Unauthorized':('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')} : 
        {'Unauthorized':'No credentials provided'}
}

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('json-server is running on port ' + port + '!')
})