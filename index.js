//select the element
const mainSection = document.querySelector('.main-section');
const winSection = document.querySelector('.win-section');
const timer = document.getElementById('timer');
const score = document.getElementById("score");

//assign new variable
let row;
let column; 
let firstOpenCard;
let point = 0;
let disableFlip = false;

//Set time for player
let intervalTime;
let secondTime = 300;
let start = false;

//sound
const audio = new Audio("./sound/flipcard-91468.mp3");
const winnerAudio = new Audio("./sound/pikachu.mp3");

function getPictures() {
    return [
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
}

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
        
        // const backImg = createImg(pictures);
        // backImg.classList.add('back-img')

        const frontImg = document.createElement('img');
        frontImg.setAttribute('src', 'pictures/front-background.jpg');
        frontImg.classList.add('front-img')

        containerDiv.appendChild(frontImg);
        // containerDiv.appendChild(backImg);

        colDiv.appendChild(containerDiv);

        rowDiv.appendChild(colDiv);
    }
    mainSection.appendChild(rowDiv);
    
}

function randomPictures(){
    const containerDivs = document.querySelectorAll('.card-container');
    const pictures = getPictures();
    
    containerDivs.forEach(ele =>{
        if (ele.querySelector('.back-img')){
            ele.removeChild(ele.querySelector('.back-img'));
        }
        const backImg = createImg(pictures);
        backImg.classList.add('back-img');
        ele.appendChild(backImg);
    })
}
randomPictures();

/*
createImg function to create random img tag
input: urlLink - as input paramater to get the pictures array
return: img - randomed img
*/
function createImg(urlLink){
    //get random number
    const random = Math.floor(Math.random() * urlLink.length);

    const img = document.createElement('img');
    img.setAttribute('src', urlLink[random]);
    urlLink.splice(random, 1); //remove random img from list

    return img;
}


//click event for each card
const cardContainer = document.querySelectorAll('.card-container');

cardContainer.forEach(card =>{
    //add event click for each card and flip the card when clicked 
    card.addEventListener('click', flipCard);    
})



// handler for fliping card
function flipCard(){
    
    audio.play(); 

    //check to toggle card
    if (disableFlip == false & !this.classList.contains('matching')){
        this.classList.toggle('flipped');
        
    }else{
        return 
    }

    // this. is the last clicked
    console.dir(this);

    //check if the first card is clicked then time will start
    if(start === false){
        timeStart();
        start = true; //to control the timeStart only run once time.
    }

    setTimeout(() =>{checkFirstCard(this)},1000);
}


/*
checkFirstCard function to find the first open card
input: clicked - as input parameter to get the last clicked card
*/
function checkFirstCard(clicked){

    //check if the first open card
    if(clicked.classList.contains('flipped')){

        // check  the first card
        if(firstOpenCard == null){

            //asign this to firstOpenCard
            firstOpenCard = clicked;
            console.log(firstOpenCard);
        
        }else{
            console.log("S")
            //check the second card
            checkMatching(clicked);
            winning();
        }
        
    }else{
        firstOpenCard = null;
    }
}


/*
checkMatching function to check match card between the new card with last open card
input: newFlip - as input parameter to get new card
*/
function checkMatching(newFlip){

    if(newFlip.querySelector('.back-img').currentSrc === firstOpenCard.querySelector('.back-img').currentSrc){
        point += 100;
        score.innerHTML = point;
        // add matching class to disable click
        newFlip.classList.add('matching');
        firstOpenCard.classList.add('matching');

    }else{
        point -= 10;
        console.log("-", point)
        //remove flipped class if not match
        newFlip.classList.remove('flipped');
        firstOpenCard.classList.remove('flipped');
    }
    firstOpenCard = null;
}

//Check winning
function winning(){
    
    const allFlipped = document.querySelectorAll('.flipped')
    if (allFlipped.length === cardContainer.length){
        winSection.textContent = `WOW, YOU WIN!!!`
        clearInterval(intervalTime);
        disableFlip = true;
        winnerAudio.play();
    }
}

//Reset button
function reset(){
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        cardContainer.forEach(ele =>{
            ele.classList.remove('flipped');
        });

        winSection.textContent = ""

        //set time is 0
        timer.innerHTML = 0;
        //stop time
        clearInterval(intervalTime);
        //reset time just begin when clicked is true
        start = false;
        // set time again
        secondTime = 300;

        //set toggle flip
        disableFlip = false;

        //reset score
        score.innerHTML = 0;
        point = 0;

        //
        randomPictures();

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
        winSection.textContent = "OOHHH! YOU LOOSE";
        disableFlip = true;

    }
    
}

function timeStart(){
    intervalTime = setInterval(setTime, 1000);
    setTime();
}

