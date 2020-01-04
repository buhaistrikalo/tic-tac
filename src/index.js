import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { 
    return (
    <button 
        className="square" 
        onClick={() => props.onClick()}
    >
        {props.value}
    </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        return (
          <Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
          />
        );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            nextX: true,
            stepNumber: 0,
        };
    }
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
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          nextX: (step % 2) === 0,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = gotWinner(current.squares);
        console.log(winner);
        function howStep(step) {return step % 2 === 0}

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
        let status;
        if (winner) {
          status = 'Победитель: ' + winner;
        } else if (this.state.stepNumber > 8) {
          status = 'Ничья';
        } else {
          status = 'Следующий игрок: ' + (this.state.nextX ? 'X' : 'O');
        }
        return (
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
            return squares[a];
        }
    }
    return null;
}
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  