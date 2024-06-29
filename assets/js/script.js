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

nextItem.addEventListener('click', function () {
    let items = document.querySelectorAll('.card');
    items.forEach((item) => {
        item.style.transition = 'transform 1s ease';
        item.style.transform = 'translateX(100%)';
    });

    setTimeout(() => {
        slider.appendChild(items[0]);
        items.forEach((item) => {
            item.style.transition = 'none';
            item.style.transform = 'translateX(0)';
        });
    }, 1000); // Adjust this timeout to match your transition duration
});

prevItem.addEventListener('click', function () {
    let items = document.querySelectorAll('.card');
    slider.insertBefore(items[items.length - 1], items[0]);

    // Force reflow before applying the next transition
    slider.offsetHeight;

    items.forEach((item) => {
        item.style.transition = 'none';
        item.style.transform = 'translateX(-100%)';
    });

    setTimeout(() => {
        items.forEach((item) => {
            item.style.transition = 'transform 1s ease';
            item.style.transform = 'translateX(0)';
        });
    }, 0); // Adjust this timeout to match your transition duration
});
