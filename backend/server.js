//import http
const http = require('http')
const app = require('./app')


app.set('port', 3000)
//create server
const server = http.createServer(app)

server.listen(3000)
