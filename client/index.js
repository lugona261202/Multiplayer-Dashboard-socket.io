const socket = io("http://localhost:3000")// obtaining address of server

socket.on('connect',(response)=>{// connecting with server using connect keyword
    console.log(response)
})

socket.on("message",(data)=>{
    console.log(data)// comparing the key on client site we can obtain message from server site

    socket.emit('message',"hello there")// sending message from client
})