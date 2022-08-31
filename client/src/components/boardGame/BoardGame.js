import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BoardGame = ({ socket }) =>{
  const board = useSelector(state => state);
  const [clickedCard, setClickedCard] = useState({})

  const pickTheCard = (event,rowIndex, columnIndex) =>{
    document.querySelector('.board__start-game').classList.add('hidden');
    if(event.target.classList.contains('board__column')) event.target.classList.remove('hidden-card')
    socket.emit("showCard", {rowIndex: rowIndex, columnIndex: columnIndex})
    socket.on("showEnemy", (card)=>{
      setClickedCard(card)
    })
  }
  
  useEffect(()=>{
    document.querySelectorAll('.board__column').forEach((card)=>{
      if(card.getAttribute('data-position') === `x-${clickedCard.rowIndex}-y-${clickedCard.columnIndex}`){
        card.classList.remove('hidden-card')
      }
    })
  },[clickedCard])

  return(
    <div className='board'>
      <div className='board__start-game' onClick={(event) => pickTheCard(event)}>
        <h2 >Start game</h2>
      </div>
      {board.map((row, rowIndex)=>{
        return <div key={rowIndex} className="board__row">{row.map((column, columnIndex)=> <div key={columnIndex} data-position={`x-${rowIndex}-y-${columnIndex}`} onClick={(event) => pickTheCard(event,rowIndex, columnIndex)} className={`board__column hidden-card area-col-${column}`}>{column}</div>)}</div>
      })}
    </div>
  )
}

export default BoardGame;