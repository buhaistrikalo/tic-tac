import React, { Component } from 'react';
import gotWinner from './index';

function Square(props) { 
    return (
      <button 
          className = "square" 
          id = { props.id }
          onClick={() => props.onClick()}
      >
          {props.value}
      </button>
    );
  }

class Board extends Component {
    renderSquare(i) { 
      const winner = gotWinner(this.props.squares);
      let win = '';
      if (winner) {
        const win_pos = [winner[1], winner[2], winner[3]];
        win = (i === win_pos[0] || i === win_pos[1] || i === win_pos[2]) ? 'square__win' : ' ';
      }
        return (
          <Square
              id = { win }
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
    
export default Board;