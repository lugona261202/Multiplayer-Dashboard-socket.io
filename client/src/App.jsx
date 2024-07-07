import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'

function App() {
  const [score, setScores]= useState({})
  const [scores,setAllScores] = useState([])
  const socket=io('localhost:3000')// obtaining server address 

  function connectSocket(){
    socket.on("connection",(socket)=>{
      console.log(socket)// connecting to server
    })
  }

  function handleInput(event){
    let {name , value } = event.target
    let currentObj = ({[name]:value})// creating object to be sent to server

    setScores((prev)=>({...prev,...currentObj}))
  }

  function sendScores(){
    socket.emit('scores',score)// sending score object to server using key score

    socket.on("playerScores",(playerScores)=>{// obtaining object of score with id updated from server
      setAllScores(playerScores)
    })
  }
  useEffect(()=>{
    connectSocket()
  },[])


  return (
    <>
     <h1>React Multiplayer Dashboard</h1>
     <input
      name ='name'
      placeholder='Enter your name'
      handleInput={handleInput}
      />

     <input
      name = 'score'
      placeholder='Enter your score'
      handleInput={handleInput}
      />

      <button className="send-scores"onClick={sendScores}>Publish Score</button>
     
     {scores.length>0? <table> // if scores contain elements then only form table otherwise empty
        <tbody>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>

      {scores.map((score)=>(
        <tr>
          <td>{score?.name}</td>
          <td>{score?.score}</td>
        </tr>
      ))}
      </tbody>
    </table> :<></>}

        </>
  )
}

export default App
