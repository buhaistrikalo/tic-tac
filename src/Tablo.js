import React, { Component } from 'react';

class Tablo extends Component {
    
    render(){
        const marker1 = (this.props.PlayerX) ? 'X' : 'O';
        const marker2 = (this.props.PlayerX) ? 'O' : 'X';
        return (
            <div className='players__table'>
                <div>
                    <input type='text'></input> 
                    <Score 
                        Score = { this.props.Score1 }
                    />
                    <div className='score'>{ marker1 }</div>
                </div>
                <br></br>
                <div>            
                    <input type='text'></input>
                    <Score 
                        Score = { this.props.Score2 }
                    />
                    <div className='score'>{ marker2 }</div>
                </div>
            </div>
        );
    }
}

class Score extends Component {
    render(){
        return (
                <div className="score">{ this.props.Score }</div>
        );
    }
}

export default Tablo;