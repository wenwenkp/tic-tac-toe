/*----- constants -----*/ 
const COLORS = {
    null : 'white',
    '1': 'purple',
    '-1': 'lime',
};
const winArray = [  //an array of the index number  
    [0, 1, 2],      //to locate the board element value
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// assign the total number of ways to win
const totalRow = winArray.length;

/*----- app's state (variables) -----*/ 
let board;
let turn; // winner, tie, game in play
let winner;
let count;

/*----- cached element references -----*/ 


/*----- event listeners -----*/ 
//click the square
document.querySelector('section.board')
    .addEventListener('click', handleclick);
//click reset
document.querySelector('#reset-button')
    .addEventListener('click', reset);

/*----- functions -----*/
//call init to initial the board
init();

//function to intial the board
function init() {
    board = [
        null, null, null,  //row 1 (index 0)
        null, null, null,  //row 2 (index 1)
        null, null, null,  //row 3 (index 2)
    ];
    turn = 1;
    count = 0;
    winner = null;
    document.querySelector('section.board').style.backgroundColor = COLORS[winner];
}
function render() {

    //count it once been clicked successfully
    count++;
    console.log(count);

    //loop each rows to check if the value are the same,
    //using the winArray as the index number to locate the cell
    //only check winner if there is more than 4 steps
    //exit once winner found
    //if last step (9 counts) made and still no winner then exit
    if(count > 4) {
        checkWinner(board, winner);
    };
    //if((count === 9) && (winner === null)) {
     //   console.log('tie!!');
       // return;
    //};
}

function handleclick(evt) {
    //get cell and its index in board
    let cell = parseInt(evt.target.id.replace('cell', ''));
    
    //if cell is not a number which means not been click correctly,
    //exit and wait for another click (same player, nothing been changed yet)
    if(isNaN(cell)) return;

    //if not a empty cell been clicked,
    //exit and wait for another click (same plaeyer, nothing been changed yet)
    if(board[cell] !== null) return;

    //if has winner then exit
    if(winner !== null) return;

    //assign the player key to the cell,
    //mark the cell with the key
    board[cell] = turn;

    //change the cell color per the key to access into the value(which is the color)
    evt.target.style.backgroundColor = COLORS[turn];

    //call render to update
    render();

    //change player
    turn = turn * -1;
}
function reset(evt) {
    init();
    console.log(`reset + ${turn} + ${winner} + ${board}`);
}

function checkWinner(board, winner) {
    for(let row = 0; row < totalRow; row++){
        //if value are the same then winner
        if(
            (board[winArray[row][0]] !== null) &&
            (board[winArray[row][0]] === board[winArray[row][1]]) &&
            (board[winArray[row][1]] === board[winArray[row][2]])
        ){
        console.log('winner!!!!');
        winner = board[winArray[row][0]];
        return true;
        }
    }
}

