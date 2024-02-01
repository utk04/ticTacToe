const Player = document.querySelector(".playername");
const Box = document.querySelectorAll(".box");
const gamebtn = document.querySelector(".btn");

let currentPlayer;
let gamegrid;

const winningpos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets creat a function which start the game 

function instgame(){
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];
    gamebtn.classList.remove("active");
    Player.innerText = `player-turn ${currentPlayer}`;
    Box.forEach((box , index) => {
        box.innerText = "";
        Box[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

    });
}

instgame();
//click krne pe behaviour

function swapturn(){
if(currentPlayer === "X"){
    currentPlayer = "O";
}
else{
    currentPlayer = "X";
}
Player.innerText = `player-turn ${currentPlayer}`;
}

//check if game is over 

function checkgameover(){
     let answer = "";
     winningpos.forEach((position) => {
        if((gamegrid[position[0]] !== "" && gamegrid[position[0]] === gamegrid[position[1]] && gamegrid[position[1]] === gamegrid[position[2]])
        ){
            if((gamegrid[position[0]]) === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //jeetne ke baad pointer na kaam kre
            Box.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            Box[position[0]].classList.add("win");
            Box[position[1]].classList.add("win");
            Box[position[2]].classList.add("win");
        }
     });

     if(answer !=""){
        gamebtn.classList.add("active");
        Player.innerText = `WINNER-> ${answer}`;
        let  music = new Audio("winning.mp3");
        music.play();
    }
    
    // if game is tied
    
    let count = 0;
    gamegrid.forEach((box) => {
        if(box != ""){
            count++;
        }
    })
    
    if(count === 9){
        Player.innerText = `TIED!`;
        gamebtn.classList.add("active");
        
     }
}

// audio effect
function music(){
    let bjao = new Audio("click.aac");
    bjao.play();
}

// click krne pr jo changes ho rhe vo hai 

function clickhandel(index){
    if(gamegrid[index]===""){
        Box[index].innerHTML = currentPlayer;
        gamegrid[index] = currentPlayer; 
        Box[index].style.pointerEvents = "none";
        // Box.addEventListener("click" , music);

        // swap turn
        swapturn();
        //koi jeet to nhi gya
        checkgameover();
    }
}

Box.forEach(( box, index) => {
    box.addEventListener("click" , () =>{
        clickhandel(index);
    }
    )
});
gamebtn.addEventListener("click" , instgame);

Box.forEach((box, index) => {
    box.addEventListener("click", () => {
        clickhandel(index);
        music(); // Move this line here to play the audio on each click
    });
});
