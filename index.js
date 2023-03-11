//select the element
const mainSection = document.querySelector('.main-section');
const winSection = document.querySelector('.win-section');

//assign new variable
let row;
let column; 
let firstOpenCard;

//Set limit time for player
let intervalTime;
let secondTime = 300;
let start = false;
const timer = document.getElementById('timer');

//make a pictures array
const pictures = [
    'pictures/p1.jpg','pictures/p2.jpg','pictures/p3.jpg',
    'pictures/p4.jpg','pictures/p5.jpg','pictures/p6.jpg',
    'pictures/p7.jpg','pictures/p8.jpg','pictures/p9.jpg',
    'pictures/p10.jpg','pictures/p11.jpg','pictures/p12.jpg',
    'pictures/p13.jpg','pictures/p14.jpg','pictures/p15.jpg',

    'pictures/p1.jpg','pictures/p2.jpg','pictures/p3.jpg',
    'pictures/p4.jpg','pictures/p5.jpg','pictures/p6.jpg',
    'pictures/p7.jpg','pictures/p8.jpg','pictures/p9.jpg',
    'pictures/p10.jpg','pictures/p11.jpg','pictures/p12.jpg',
    'pictures/p13.jpg','pictures/p14.jpg','pictures/p15.jpg'
];

//Created a board to play. Total slot need an even number.
for( row = 0; row <5 ; row++ ){

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (column = 0 ;  column < 6 ; column++){
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-2');
        colDiv.classList.add('flipbox');

        const containerDiv = document.createElement('div')
        containerDiv.classList.add('card-container');
        
        const backImg = createImg(pictures);
        backImg.classList.add('back-img')

        const frontImg = document.createElement('img');
        frontImg.setAttribute('src', 'pictures/front-background.jpg');
        frontImg.classList.add('front-img')

        containerDiv.appendChild(frontImg);
        containerDiv.appendChild(backImg);

        colDiv.appendChild(containerDiv);

        rowDiv.appendChild(colDiv);
    }
    mainSection.appendChild(rowDiv);
    
    
}

function createImg(urlLink){
    //get random number
    const random = Math.floor(Math.random() * urlLink.length);

    const img = document.createElement('img');
    img.setAttribute('src', urlLink[random]);
    urlLink.splice(random, 1)

    return img;
}

//click event for each card
const cardContainer = document.querySelectorAll('.card-container');

cardContainer.forEach(card =>{
    //add event click for each card and flip the card when clicked 
    card.addEventListener('click', flipCard);
    
        
})

function flipCard(){
    // this. is the last clicked
    this.classList.toggle('flipped');
    console.dir(this);

    //check if the first card is clicked then time will start
    if(start === false){
        timeStart();
        start = true; //to control the timeStart only run once time.
    }

    //Deplay 1 second before checking
    setTimeout(()=>{
        console.log('Deplayed for 1 second');

        //check if the first open card
        if(this.classList.contains('flipped')){
    
            // check  the first card
            if(firstOpenCard == null){

                //asign this to firstOpenCard
                firstOpenCard = this;
                console.log(firstOpenCard);
            
            }else{
                console.log("S")
                //check the second card
                checkMatching(this);
                winning();
            }
            
        }else{
            firstOpenCard = null;
        }

    },1000)

}

//Check match card between the new card with last open card
function checkMatching(newFlip){

    if(newFlip.querySelector('.back-img').currentSrc === firstOpenCard.querySelector('.back-img').currentSrc){
        console.log("Matching")
    }else{
        newFlip.classList.remove('flipped');
        firstOpenCard.classList.remove('flipped');
    }
    firstOpenCard = null;
}

//Check winning
function winning(){
    
    const allFlipped = document.querySelectorAll('.flipped')
    if (allFlipped.length === cardContainer.length){
        winSection.textContent = "WOW, YOU WIN!!!"
    }
}

//Reset button
function reset(){
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        cardContainer.forEach(ele =>{
            ele.classList.remove('flipped');
        });

        //set time is 0
        timer.innerHTML = 0;
        //stop time
        clearInterval(intervalTime);
        //reset time just begin when clicked is true
        start = false;
        // set time again
        secondTime = 300;

    });
}

reset();


function setTime(){

    let min = Math.floor(secondTime/60);
    let sec = secondTime % 60;
    
    if (sec.toString().length === 1){
        sec = "0" + sec.toString();
    }
    timer.innerHTML = min + ":" + sec ;

    if (secondTime > 0){
        secondTime -- ;

    }else{
        timer.innerHTML = "Time out";
        winSection.textContent = "OOHHH! YOU LOOSE"
    }
    
}

function timeStart(){
    intervalTime = setInterval(setTime, 1000);
    setTime();
}



