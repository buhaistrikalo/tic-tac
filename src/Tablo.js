import React, { Component } from 'react';

class Tablo extends Component {
    render(){
        return (
            <div className='players__table'>
                <div>
                    <input type='text'></input> 
                    <Score 
                        Score = { this.props.Score1 }
                    />
                </div>
                <br></br>
                <div>            
                    <input type='text'></input>
                    <Score 
                        Score = { this.props.Score2 }
                    />
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