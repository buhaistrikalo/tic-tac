import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tablo from './Tablo';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        history: [{
            squares: Array(9).fill(null),
        }],
        nextX: true,
        stepNumber: 0,
        Score1: 0,
        Score2: 0,
    };
  }
  // Move
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (gotWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.nextX ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      nextX: !this.state.nextX,
    });
  }

  // History jump
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      nextX: (step % 2) === 0,
    });
  }

  clearBoard(squares){
    squares = null;
    this.setState({
      
      stepNumber: 0,
      nextX: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = gotWinner(current.squares);
    
    
    function howStep(step) {return step % 2 === 0}

    // History
    const moves = history.map((step, move) => { 
        const desc = howStep(move) ? 
            'O': 
            'X';
        let history_steps = move > 0 
        ? (
            <li key={move}>
                <button className="button__history" onClick={() => this.jumpTo(move)}>{ desc }</button>
            </li> 
        ) :
        null;
        return history_steps;
    });

    // Game Status (Move, win)
    let status;
    if (winner) {
      status = 'Победитель: ' + winner[0];
      if (winner[0] === 'X') {
        this.state.Score1 += 1;
      } else {
        this.state.Score2 += 1;
      }
    } else if (this.state.stepNumber > 8) {
      status = 'Ничья';
    } else {
      status = 'Следующий игрок: ' + (this.state.nextX ? 'X' : 'O');
    }
    // Output
    return (
      <div>
        <div className="game">
          
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{ status }</div>
                <ol>{ moves }</ol>
            </div>
        </div>
        <button className="button__newgame" onClick={() => this.clearBoard(current.squares)}>Новая игра</button>
        
        <div className='tablo'>
          <Tablo 
            Score1 = { this.state.Score1 }
            Score2 = { this.state.Score2 }
          />
        </div>
      </div>
    );
  }
}

function gotWinner(squares){
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        let win = [squares[a], a,b,c];
        return win;
    }
  }
  return null;
}
export default gotWinner;
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
  