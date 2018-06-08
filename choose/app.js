const Koa = require('koa')
const WebSocket = require('ws');

const app = new Koa()

let ws = new WebSocket.Server({
  port: 4010,
})

ws.on('connection', (ctx) => {
  console.log("Connect Client ")
  ctx.on('message', (message) => {
    ws.clients.forEach(client => {
      client.send(message)
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  })
})

ws.on('close', () => {
})

console.log('Start server Choose')