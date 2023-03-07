const mainDiv = document.querySelector('.main-container');
let row;
let column; 

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
const mainSection = document.querySelector('.main-section')



for (column = 0 ;  column < 6 ; column++){

    for( row = 0; row <5 ; row++ ){
        const div = document.createElement('div');
        div.classList.add('main-container');
        const newImg = createImg(pictures);
        const frontImg = document.createElement('img');
        frontImg.setAttribute('src', 'pictures/front-background.jpg')
        div.appendChild(frontImg);
        div.appendChild(newImg);
        mainSection.appendChild(div)
        
    }
    
    
}

function createImg(urlLink){
    const random = Math.floor(Math.random() * urlLink.length);
    console.log(urlLink.length)
    console.log(random)
    const img = document.createElement('img');
    img.setAttribute('src', urlLink[random]);
    urlLink.splice(random, 1)
    return img;
}