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
let msg;    //msg zone

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
    msg = document.getElementById(`msg`);
    msg.style.color = COLORS[null];
    //change cell color to white
    for(let i = 0; i < board.length; i++) {
        document.getElementById(`cell${i}`).style.backgroundColor = COLORS[null];
    };
}
//function to handle the click to the cell
function handleclick(evt) {
    //discontinue if winner found
    if(turn === null) return;
    //discontinue after 9 steps
    if(count === 9){
        return;
    };
    //get cell index#
    cell = parseInt(evt.target.id.replace('cell', ''));
    //discontinue if not a cell been clicked
    if(isNaN(cell)) return;
    //discontinue if not an empty cell been clicked
    if(board[cell] !== null) return;
    //call render to update data
    render();
}
//function to update data
function render() {
    //count once if click successfully
    count++;
    //assign player's number to the cell
    board[cell] = turn;
    //change cell color per player
    document.getElementById(`cell${cell}`).style.backgroundColor = COLORS[turn];
    //start to check winner after 4 steps
    if(count > 4) {
        //if winner found then discontinue
        if(checkWinner(board)){
            return;
        }
    };
    //once last step is made and no winner then display message
    if(count === 9){
        msg.style.color = 'black';
        msg.textContent = 'TIE';
        return;
    };
    //switch player
    turn = turn * -1;
    //display message for each player
    msg.style.color = COLORS[turn];
    msg.textContent = `Now : ${COLORS[turn]}'s Turn!!`;
}
//function to check if there is a winner
function checkWinner(board) {
    //loop each array in winning pattern
    for(let row = 0; row < totalRow; row++){
        //if 3 consisten same value been found in the board, winner found
        if(
            (board[winArray[row][0]] !== null) &&
            (board[winArray[row][0]] === board[winArray[row][1]]) &&
            (board[winArray[row][1]] === board[winArray[row][2]])
        )
        {
        //display winner and no more steps, switch to null
        msg.textContent = `${COLORS[turn]} Winner!!! Congratulations!!!`;
        turn = null;
        return true;        
        };
    }
}
//function to replay
function reset(evt) {
    //call init function to reset data
    init();
}
