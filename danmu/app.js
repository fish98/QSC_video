const Koa = require('koa')
const WebSocket = require('ws')
// const redis = require("redis");

// let sub = redis.createClient() 
// let pub = redis.createClient()
let num = 0

let ws = new WebSocket.Server({
    port: 4020,
})

ws.on('connection', socket => {

    console.log(`Connect User : ${++num}`)

    socket.on('message', data => {
        data = JSON.parse(data)
        if (data.type === "danmu") {
            // pub.publish('ttfish', JSON.stringify(data)
            ws.clients.forEach(client => {
                client.send(JSON.stringify({
                    type: "danmu",
                    content: data.content
                }))
            })
        } 
    })

    // sub.on("message", function (channel, message) {
    //     let data = JSON.parse(message)
    //     ws.clients.forEach(client => {
    //         client.send(JSON.stringify({
    //             type: "danmu",
    //             content: data.content
    //         }))
    //     })
    // })
})

ws.on('close', () => {
    //console.log(`UnConnect Num = ${--num}`)
})

// sub.subscribe('ttfish')

console.log('Start server Danmu')

