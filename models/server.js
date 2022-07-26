const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const Sockets = require('./sockets')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    // HTTP server
    this.server = http.createServer(this.app)

    // Socket configs
    this.io = socketio(this.server)
  }

  middlewares() {
    // Deploy public directory
    this.app.use(express.static(path.resolve(__dirname, '../public')))
  }

  configureSockets() {
    new Sockets(this.io)
  }

  execute() {
    // Init middlewares
    this.middlewares()

    // Init sockets
    this.configureSockets()

    // Init HTTP Server
    this.server.listen(this.port, () => {
      console.log('listening on port', this.port)
    })
  }
}

module.exports = Server
