import './App.css'
import { useState } from 'react';

const TURNS = {
    x: 'X' ,
    o: 'O'
}
const WINNER_SEQUENCES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const Square = ( ({children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : '' }`;
    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <div className={ className } onClick={handleClick}>
            {children}
        </div>
    )
})

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.x)
    const [winner, setWinner] = useState(null)
    const updateBoard = (index) => {
        if (board[index] || winner) {
            return
        }
        const newBoard = [...board]
        newBoard[index] =  turn;
        setBoard(newBoard)
        const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
        setTurn(newTurn);
        const newWinner = checkWinner(newBoard);
        if(newWinner){
            setWinner(newWinner)
        }
    }
    const checkWinner = (boardToCheck) => {
        for (const sequence of WINNER_SEQUENCES) {
            const [a,b,c] = sequence;
            if(
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[b] === boardToCheck[c]
            ) {
                return boardToCheck[a]
            }
        }
        return null;
    }
    const resetApp = () =>{
        setBoard(Array(9).fill(null));
        setTurn(TURNS.x);
        setWinner(null)
    }
    return <>
        <main className='board'>
            <h1>
                TIC TAC TOE WITH REACT
            </h1>
            <button onClick={resetApp}>Reset game</button>
            <section className='game'>
                {
                    board.map( (_,i) => {
                        return (
                            <Square
                                key={i}
                                index={i}
                                updateBoard={updateBoard}
                            >
                                {board[i]}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={ turn === TURNS.x }> { TURNS.x } </Square>
                <Square isSelected={ turn === TURNS.o }> { TURNS.o } </Square>
            </section>

            {
                winner != null &&  (
                    <section className='winner'>
                        <div className='text'>
                             <h2>
                                 {winner == false? 'Empate' : 'Ganó'}
                             </h2>

                            <header className='win'>
                                {winner && <Square>{winner}</Square>}
                            </header>

                            <footer>
                                <button onClick={resetApp} >Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }
        </main>
    </>
}

export default App
