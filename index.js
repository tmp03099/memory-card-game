//select the element
const mainSection = document.querySelector('.main-section');


//assign new variable
let row;
let column; 

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
let flippedCard = false;

cardContainer.forEach(card =>{
    card.addEventListener('click', flipCard);
    
})

function flipCard(){
    console.log(this);
    
    this.classList.toggle('flipped');
}





