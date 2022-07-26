class Sockets {
  constructor(io) {
    this.io = io
    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      // Listening to event:
      socket.on('client-message', (data) => {
        console.log(data)
        this.io.emit('server-message', { msg: data.msg })
      })
    })
  }
}

module.exports = Sockets
