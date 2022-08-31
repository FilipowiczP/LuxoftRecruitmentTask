import './style.sass';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BoardGame from './components/boardGame/BoardGame';

const socket = io.connect("http://localhost:3001");

function App() {
  const [player, setPlayer] = useState('');
  const [enemyInTable, setEnemyInTable] = useState([]);
  const [peopleInGame, setPeopleInGame] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    socket.on("startGame", (map)=>{
      dispatch({type:'START_GAME', payload: map});
    })
    socket.on("playersInRoom", (users)=>{
      setPeopleInGame(users.players)
      setEnemyInTable([...enemyInTable, users.userName]);
    })
  },[socket])
  
  const play = () =>{
    socket.emit("joinToGame", {userName: player})
    setPlayer('')
  }

  return (
    <div className="App">
      <div>
        <input className='input' type="text" value={player} placeholder="Nick" onChange={(event) => {
          setPlayer(event.target.value)
        }}/>
        {peopleInGame.length <= 1 && <button className="btn" onClick={play}>Join</button>}
      </div>
      <section className='game'>
        <p className='game__user'>Enemy: {enemyInTable}</p>
        <BoardGame socket={socket}/>
      </section>
    </div>
  );
}

export default App;
