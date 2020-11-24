import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


function Square (props){
  return (
    <button className="square" 
    onClick ={props.onClick}
     >
      {props.value}
    </button>
       // when the button is clicked
    // it will call the props wich is 
    // the onClick function of the Board 
  );
}



class Board extends React.Component {

  

  renderSquare(i) {
    return (
    <Square 
    value = {this.props.squares[i]} 
    onClick = {()=> this.props.onClick(i)}
    />
    );
    // on value 
    //instead of passing value = {i} as a props, as before
    // we will now pass the state
    // which is an Array and this new i 
    // is the index of the state Array
    // onClick, is calling the handleClick(i) function 
     
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

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0, 
      xIsNext: true, 
    }
  }


  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1); 
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    //as we want to stop the game if there is a winner
    //  we are checking if we have a winner and
    // in case we have, we will return and we will
    // not need to modify our state
    squares[i] = this.state.xIsNext ? 'x' : 'o' ;
    // if the state of xIsNext is true then put a 'X'
    // else put a 'o'
    this.setState({
      history: history.concat([{
        squares:squares, 
      }]),
      stepNumber: history.length, 
      xIsNext: !this.state.xIsNext,
      // we assign the oposit value, that was before
      // "x" "o" after the click. 
      // so everytime we call handelClick 2 things will
      // happen:
      // we will update the squares
      // and be boolean variable xIsNext: true, false,
    });
  }
  // this function copies the array square
  // and updates the values 

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }




  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // we create the const winner and we are passing
    // our array of squares in the funcion 
    // calculateWinner that will determine who is the
    // winner


    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key = {move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    let status;
    if (winner){
      status = "Winner: " + winner;
    } else{
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares = {current.squares}
          onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// Renderiza los componentes
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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