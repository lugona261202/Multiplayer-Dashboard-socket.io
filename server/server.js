// installing packages for creating server
const {createServer} = require ("http")
const {Server} = require ("socket.io")
// using function and declaring them as object for further use
const httpServer = createServer()
const io = new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173'// this allows only request from following ip on our server site
    },
})

let playerScores= []// storing all scores pair obtained from client
io.on("connection",(socket)=>{// establishing socket connection with client

    socket.on("scores",(scores)=>{// obtaining score object from client input through form
        playerScores.push({...scores,id: socket.id})// pushing into array along with socket id , provided by socket itself using destructuring
        
        socket.emit("playerScoreds",playerScores)// sending scores back to client

        setInterval(()=>{// sending score in every 5 seconds
            socket.emit("playerScoreds",playerScores)
        },5000)

    })
  /*  socket.on("message",(data)=>{
        console.log(data) // obtaining data from client
    })

    socket.emit("message","Hello")// using the key message we are sending message from server site
  */  
    
})
// establishing http connection
httpServer.listen(3000,()=>{
    console.log("Server is running")
})