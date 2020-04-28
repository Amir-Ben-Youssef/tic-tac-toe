document.addEventListener('DOMContentLoaded', function(event) {

    var player1 = "X"
    var player2 = "O"
    var score1 = 0;
    var score2 = 0;
    var selector = 1 // selector of player if 1 select player 1, if 2 slect player 2
    var click = 0 // counter for the number of case clicked

//------------event---------------------------------------------------------------------

// reset the game when clicking on reset
document.getElementById("reset").addEventListener('click', function(){
    console.log('clicked')
    reset();
    score1 = 0;
    score2 = 0;
    document.getElementById("player1").innerHTML= score1;
    document.getElementById("player2").innerHTML= score2;
})

// elect a case in the board
    document.querySelectorAll('table td')
    .forEach(e => e.addEventListener("click", function() {  // add click event listener
        if (!this.innerHTML){ // if it is not yet clicked
            click ++ // add one to nbr of clicks
            if (selector === 1){ //  player 1
                this.innerHTML = player1
                selector++;
                check(player1);
            }
            // player 2
            else{
                this.innerHTML = player2;
                selector--; 
                check(player2);
            }
        }  
    },));

// ------------------------------helper functions -----------------------------------------

// check function to check if there is a winner
    var check = function(player){
        var element = document.getElementById("mytable").rows
        var matrix = []
        var result =  false

    // construct the matrix
        for (let i = 0; i< element.length ; i++){ 
             var row = []
             for (let j = 0 ; j < element[i].cells.length; j++){
                row.push( element[i].cells[j].innerHTML)
             }  
             matrix.push(row)         
        } 
 
        for (let i = 0; i< matrix.length ; i++){ 
            // check for rows
            if ((matrix[i][0] ===  player) && (matrix[i][1]===  player) && (matrix[i][2]===  player)){
                 result = true
            }
             // check for columns 
            else if ((matrix[0][i]===  player) && (matrix[1][i]===  player) && (matrix[2][i]===  player)){
                 result = true
            }
        }

    // check for diagonals
        if ((matrix[0][0] ===  player) && (matrix[1][1]===  player) && (matrix[2][2] === player )){
                 result = true
        }
        else if ((matrix[0][2] ===  player) && (matrix[1][1] ===  player) && (matrix[2][0]=== player )){
                 result = true
        }

    // check if the board is full
        else if (click === 9){
            gameover(player, true)
        }
  
        if (result === true){
            gameover(player)
        }
    }

// game over when one of the player won
    var gameover = function(player, draw){
        if (!draw){ // in case the player won
            alert ( `player ${player} won` )
            if (player === "X"){
                score1++
                document.getElementById("player1").innerHTML= score1
            }
            else{
                score2++
                document.getElementById("player2").innerHTML= score2
            }

        }
        else { // in case no one won
            alert ( ` Game Over !! \n no one won here :-) ` )
        }

        reset() // reset  the board
    }

// function reset the board
    var reset = function(){
        click = 0;
        document.querySelectorAll('table td')
        .forEach(element => element.innerHTML ="")
    }


})


