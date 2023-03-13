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
let  disableFlip = false;

//Set time for player
let intervalTime;
let secondTime = 300;
let start = false;


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
randomPictures();

function createImg(urlLink){

    //get random number
    const random = Math.floor(Math.random() * urlLink.length);

    const img = document.createElement('img');
    img.setAttribute('src', urlLink[random]);
    urlLink.splice(random, 1); //remove random img from list

    return img;
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


//click event for each card
const cardContainer = document.querySelectorAll('.card-container');

cardContainer.forEach(card =>{
    //add event click for each card and flip the card when clicked 
    card.addEventListener('click', flipCard);
    
        
})

function flipCard(){

    if (disableFlip == false){
        this.classList.toggle('flipped');

    }

    // this. is the last clicked
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
        console.log("Matching");
        point += 100;
        score.innerHTML = point;
        console.log("+", point);

    }else{
        point -= 10;
        console.log("-", point)

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

