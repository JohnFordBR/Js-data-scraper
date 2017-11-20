const express  = require("express");
const app = express();
console.log("ok");
app.use(express.static("server"));
app.listen( process.env.PORT  || 8080,()=>{console.log("all is right");});
app.get('/', function (req, res) {
  res.send('hello world')
})
