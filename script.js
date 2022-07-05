//store player info x2
//gamebord
// const p1name = document.querySelector("#player-1-name");
// const p2name = document.querySelector("#player-2-name");
// const m1choice = document.querySelector(".marker-1-choice");
// const m2choice = document.querySelector(".marker-2-choice");
// const start = document.querySelector("#start");
// const stuff = document.querySelector("#stuff");
// const p = document.createElement('p');  

// start.addEventListener('click', () => {
//     const player1 = playerFactory(p1name.value, m1choice.value);
//     const player2 = playerFactory(p2name.value, m2choice.value);
//     if(player1.marker == player2.marker){
//         console.log("Each player must have a different marker.")
//     }
//     else{
//         player1.sayHello();
//         player2.sayHello();
//         playGame(player1, player2);
//     }
// })


// const gameBoard = (() => {
    
//     return {};
//   })();


// function playGame(player1, player2){
    
// }

// const playerFactory = (name, marker) => {
//     const sayHello = () => {
//         p.setAttribute('id', "p");
//         p.textContent = "Hello " + name + ", you're playing with the " + marker + " marker!";
//         stuff.appendChild(p);
//     };
//     return {name, marker, sayHello};
// }


"use strict";

const PlayerFactory = (marker) => {
    this.marker = marker;

    const getMarker  = () => {
        return marker
    };
    return {getMarker};
}

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setCells = (index, marker) => {
        if (index> board.length) return;
        board[index] = marker;
    };

    const getCells = (index) =>{
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i]= "";
        }
    };

    return{setCells, getCells, reset};
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("container");
    const restartButton = document.getElementById("restart");
  
    fieldElements.forEach((field) =>
      field.addEventListener("click", (e) => {
        if (gameController.getIsOver() || e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateGameboard();
      })
    );
  
    restartButton.addEventListener("click", (e) => {
      gameBoard.reset();
      gameController.reset();
      updateGameboard();
      setMessageElement("Player X's turn");
    });
  
    const updateGameboard = () => {
      for (let i = 0; i < fieldElements.length; i++) {
        fieldElements[i].textContent = gameBoard.getCells(i);
      }
    };
  
    const setResultMessage = (winner) => {
      if (winner === "Draw") {
        setMessageElement("It's a draw!");
      } else {
        setMessageElement(`Player ${winner} has won!`);
      }
    };
  
    const setMessageElement = (message) => {
      messageElement.textContent = message;
    };
  
    return { setResultMessage, setMessageElement };
  })();
  
  const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;
  
    const playRound = (fieldIndex) => {
      gameBoard.setCgetCells(fieldIndex, getCurrentPlayerMarker());
      if (checkWinner(fieldIndex)) {
        displayController.setResultMessage(getCurrentPlayerMarker());
        isOver = true;
        return;
      }
      if (round === 9) {
        displayController.setResultMessage("Draw");
        isOver = true;
        return;
      }
      round++;
      displayController.setMessageElement(
        `Player ${getCurrentPlayerMarker()}'s turn`
      );
    };
  
    const getCurrentPlayerMarker = () => {
      return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
    };
  
    const checkWinner = (fieldIndex) => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winConditions
        .filter((combination) => combination.includes(fieldIndex))
        .some((possibleCombination) =>
          possibleCombination.every(
            (index) => gameBoard.getCells(index) === getCurrentPlayerMarker()
          )
        );
    };
  
    const getIsOver = () => {
      return isOver;
    };
  
    const reset = () => {
      round = 1;
      isOver = false;
    };
  
    return { playRound, getIsOver, reset };
  })();
  
