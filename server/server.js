// installing packages for creating server
const {createServer} = require ("http")
const {Server} = require ("socket.io")
// using function and declaring them as object for further use
const httpServer = createServer()
const socket = new Server(httpServer,{
    cors:{
        origin:'http://127.0.0.1:5500'// this allows only request from following ip on our server site
    }
})
// establishing socket connection
socket.on("connection",(socket)=>{
    console.log(socket)

    socket.on("message",(data)=>{
        console.log(data) // obtaining data from client
    })

    socket.emit("message","Hello")// using the key message we are sending message from server site


})
// establishing http connection
httpServer.listen(3000,()=>{})