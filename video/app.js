const Koa = require('koa')
const WebSocket = require('ws');

const app = new Koa()

let ws = new WebSocket.Server({
  port: 4000,
})

ws.on('connection', (ctx) => {
  console.log('Connection Start')

  ctx.on('message', msg => {
    ws.clients.forEach(client => {
      client.send(msg)
    })
  })
})

console.log('Start Server Video')