/*----- constants --------------------------*/ 
const COLORS = {     
    null : 'white',
    '1': 'Lightcoral',
    '-1': 'Lightgreen',
};
//winning pattern
const winArray = [
    [0, 1, 2],      
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
//total number of ways to win
const totalRow = winArray.length;

/*----- app's state (variables) ----------*/ 
let board;  //game board
let turn;   //to indicate player1 :1, player2 :-1, and winner : null
let count;  //to count the total steps
let cell;   //to id the cell position in the game board
let msg;    //winner message zone
let xTurn;  //X player turn
let oTurn;  //O player turn
let smallBoardCount;

/*----- cached element references -------*/ 

/*----- event listeners -----------------*/ 
//click the square
document.querySelector('section.board')
    .addEventListener('click', handleclick);
//click to replay
document.querySelector('#reset-button')
    .addEventListener('click', reset);

/*----- functions -----------------------*/
//call init to initial the board
init();

//function to intial the board and variables
function init() {
    board = [
        null, null, null,  //row 1 (index 0)
        null, null, null,  //row 2 (index 1)
        null, null, null,  //row 3 (index 2)
    ];
    turn = 1;
    count = 0;
    smallBoardCount = 1;
    msg = document.getElementById(`msg`);
    xTurn = document.getElementById(`x-turn`);
    oTurn = document.getElementById(`o-turn`);
    msg.style.color = 'black';
    msg.textContent = ``;
    xTurn.style.visibility = `visible`;
    oTurn.style.visibility = `hidden`;
    for(let i = 0; i < board.length; i++) {
        document.getElementById(`cell${i}`).style.backgroundColor = COLORS[null];
    };
    for(let n = 0; n < board.length; n++) {
        document.getElementById(`x${n}`).textContent = '';
        console.log(document.getElementById(`x${n}`).textContent);
        document.getElementById(`o${n}`).textContent = '';
    }    
}
//function to handle the click to the cell
    //discontinue if winner found
    //discontinue after 9 steps
    //get cell index#
    //discontinue if not a cell been clicked
    //discontinue if not an empty cell been clicked
    //call render to update data
function handleclick(evt) {
    if(turn === null) return;
    if(count === 9){
        return;
    };
    cell = parseInt(evt.target.id.replace('cell', ''));
    if(isNaN(cell)) return;
    if(board[cell] !== null) return;
    render();
}
//function to update data
    //count once if click successfully
    //assign player's number to the cell
    //change cell color per player
    //start to check winner after 4 steps
        //if winner found then discontinue
        //once last step is made and if no winner then display message
    //switch player
function render() {
    count++;
    board[cell] = turn;
    updateSmallBoard();
    document.getElementById(`cell${cell}`).style.backgroundColor = COLORS[turn];
    if(count > 4) {
        if(checkWinner(board)){
            visibility();
            return;
        }
        else if(count === 9) {
            msg.textContent = 'TIE';
            visibility();
            return;
        };
    };
    turn = turn * -1;
    visibility();
    
}
//function to check if there is a winner
    //loop each array in winning pattern
        //if 3 consisten same value been found in the board, winner found
            //display winner and no more steps, switch to null
function checkWinner(board) {
    for(let row = 0; row < totalRow; row++){
        if( (board[winArray[row][0]] !== null) &&
            (board[winArray[row][0]] === board[winArray[row][1]]) &&
            (board[winArray[row][1]] === board[winArray[row][2]])
        ) {
            if(turn === 1) {
                msg.textContent = `Winner ------> X`;
            }else if(turn === -1) {
                msg.textContent = `Winner ------> O`;
            }
            turn = null;
            return true;   
        }
    }
}
//function to replay
    //call init function to reset data
function reset(evt) {
    init();
}
//contorl message visibility for each player
function visibility() {
    if(turn === 1){
        xTurn.style.visibility = `visible`;
        oTurn.style.visibility = `hidden`;
    }else if(turn === -1) {
        xTurn.style.visibility = `hidden`;
        oTurn.style.visibility = `visible`;
    };
    if(count === 9 || turn === null) {
        xTurn.style.visibility = `hidden`;
        oTurn.style.visibility = `hidden`;
    };
}
//control number of steps in small board
function updateSmallBoard() {
    if(turn === 1) {
            document.getElementById(`x${cell}`).textContent = smallBoardCount;
    }else if(turn === -1) {
        document.getElementById(`o${cell}`).textContent = smallBoardCount;
        smallBoardCount++;
    };
}
