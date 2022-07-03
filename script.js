//store player info x2
//gamebord
const p1name = document.querySelector("#player-1-name");
const p2name = document.querySelector("#player-2-name");
const m1choice = document.querySelector(".marker-1-choice");
const m2choice = document.querySelector(".marker-2-choice");
const start = document.querySelector("#start");
const stuff = document.querySelector("#stuff");
const p = document.createElement('p');  

start.addEventListener('click', () => {
    const player1 = playerFactory(p1name.value, m1choice.value);
    const player2 = playerFactory(p2name.value, m2choice.value);
    if(player1.marker == player2.marker){
        console.log("Each player must have a different marker.")
    }
    else{
        player1.sayHello();
        player2.sayHello();
        playGame(player1, player2);
    }
})



const gameBoard = (() => {
    
    return {};
  })();


function playGame(player1, player2){
    
}

const playerFactory = (name, marker) => {
    const sayHello = () => {
        p.setAttribute('id', "p");
        p.textContent = "Hello " + name + ", you're playing with the " + marker + " marker!";
        stuff.appendChild(p);
    };
    return {name, marker, sayHello};
}


