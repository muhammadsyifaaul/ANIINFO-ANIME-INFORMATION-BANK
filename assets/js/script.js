// axios.get('https://kitsu.io/api/edge/anime?filter[text]=enen')
// .then(res => res)
// .then(res => console.log(res))

// slider top anime
document.addEventListener('DOMContentLoaded', function() {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let slide = document.querySelector('.slide');

    next.addEventListener('click', function() {
        let item = document.querySelectorAll('.anime');
        slide.style.transition = '0.3s'; 
        slide.style.transform = 'translateX(-100%)'; 
    
        
        setTimeout(() => {
            slide.appendChild(item[0]); 
            slide.style.transition = 'transform 0.5s ease'; 
            slide.style.transform = 'translateX(0)'; 
        }, 500); 
    
    });

    prev.addEventListener('click', function() {
        let item = document.querySelectorAll('.anime');
        slide.style.transition = '0.3s';
        slide.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            slide.prepend(item[item.length - 1]);
        

            slide.style.transition = 'transform 0.5s ease';
            slide.style.transform = 'translateX(0)';
        },500)

    });
});


// slider popular anime

const nextItem = document.querySelector('.next-slide');
const prevItem = document.querySelector('.prev-slide');
const slider = document.querySelector('.slider-card');

nextItem.addEventListener('click', function() {
    let items = document.querySelectorAll('.card');
    const firstItem = items[0];


    slider.appendChild(firstItem);


    items.forEach((card) => {
        card.style.transition = 'none';
        card.style.transform = 'translateX(0)';
    });


    void slider.offsetWidth;

    items.forEach((card) => {
        card.style.transition = 'transform 0.5s';
        card.style.transform = 'translateX(-100%)';
    });
});

prevItem.addEventListener('click', function() {
    let items = document.querySelectorAll('.card');
    const lastItem = items[items.length - 1];


    slider.insertBefore(lastItem, items[0]);


    items.forEach((card) => {
        card.style.transition = 'none';
        card.style.transform = 'translateX(-100%)';
    });


    void slider.offsetWidth;

    items.forEach((card) => {
        card.style.transition = 'transform 0.5s';
        card.style.transform = 'translateX(0)';
    });
});

