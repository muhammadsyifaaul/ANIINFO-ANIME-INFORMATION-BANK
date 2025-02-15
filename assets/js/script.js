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


// manage ui with api
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
const api = 'https://kitsu.io/api/edge/anime';
axios.get(api)
.then(res => {
    
    const dataUnion = res.data.data;
    const ratings =dataUnion.map(anime => parseFloat(anime.attributes.averageRating))
    const maxRating = Math.max(...ratings)
    const highestRatedAnime = dataUnion.find(anime => parseFloat(anime.attributes.averageRating) === maxRating)
    const normalizeRating = (rating) => {
      return (rating / 100) * 5;
  }
    const sortedAnimes = dataUnion.sort((a, b) => {
        return parseFloat(b.attributes.averageRating) - parseFloat(a.attributes.averageRating);
    });
    const topAnimes = sortedAnimes.slice(1, 6);
    
    const data = {
        title: highestRatedAnime.attributes.canonicalTitle,
        synop: highestRatedAnime.attributes.synopsis,
        eps: highestRatedAnime.attributes.episodeLength,
        year: highestRatedAnime.attributes.endDate,
        img : highestRatedAnime.attributes.coverImage.original
    }
    recAnime(data)
    topAnime(topAnimes)
    popularAnime(dataUnion)
})

function recAnime(data) {
    const bg = document.querySelector('.top-anime')
    const animeDetail = document.querySelector('.anime-detail');
    const image = document.querySelector('.image')
    const { title, synop, eps, year, img } = data;
    const truncatedSynopsis = truncateText(synop, 300); // Misalnya, maksimal 200 karakter
    const dataAnime = `
      <h1>${title}</h1>
      <p>${truncatedSynopsis}</p>
      <ul>
        <li>Episode: ${eps} Episode</li>
        <li>Year: ${year}</li>
        <li>Genre: Romance, Fantasi</li>
      </ul>
      <a href="">MORE INFO</a>
    `;
    const imageAnime = `
    <img src="${img}" alt="">
    `
    console.log(img)
    animeDetail.innerHTML = dataAnime;
    image.innerHTML = imageAnime;
    bg.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${img}')`;
    bg.style.backgroundRepeat = 'no-repeat';
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center center';
  }

  function topAnime(data) {
    const slide = document.querySelector('.slide');
    
    data.forEach(anime => {
        const data = {
            title: anime.attributes.canonicalTitle,
            synop: anime.attributes.synopsis,
            eps: anime.attributes.episodeLength,
            year: anime.attributes.endDate,
            img : anime.attributes.coverImage.original
        }
        const {title , synop , eps , year, img} = data
        const truncatedSynopsis = truncateText(synop, 300);
        const animes = `
        <div class="anime">
            <div class="image-anime">
              <img src="${img}" alt="">
            </div>
            <div class="anime-data">
              <h1>${title}</h1>
              <p>
                ${truncatedSynopsis}
              </p>
              <ul>
                <li>Episode : ${eps} Episode</li>
                <li>Date : ${year}</li>
                <li>Genre : Romance , Fantasi</li>
              </ul>
            </div>
          </div>
        `
        slide.innerHTML += animes;
    });
  }

  function popularAnime(data) {
    const slider = document.querySelector('.slider-card')
    data.forEach(anime => {
        const data = {
          id: anime.id,
            title: anime.attributes.canonicalTitle,
            rating: anime.attributes.averageRating,
            synop: anime.attributes.synopsis,
            eps: anime.attributes.episodeLength,
            year: anime.attributes.endDate,
            img : anime.attributes.posterImage.tiny
        }
        const {id, title ,rating, eps , year, img} = data
        const roundedRating = (rating / 100 * 5).toFixed(1);
        console.log(roundedRating)
        const card = `
        <div class="card">
              <div class="top">
                <img src="${img}" alt="">
              </div>
              <div class="data">
                <div class="head">
                  <h1 data-id="${id}">${title} </h1>
                  <p><i class='bx bxs-star'></i> <span>${roundedRating}</span></p>
                </div>
                <div class="body">
                  <ul>
                    <li><a href="">${eps}</a></li>
                    <li><a href="">${year}</a></li>
                  </ul>
                </div>
              </div>
            </div>
        `
        slider.innerHTML += card;
    })
  }

  document.addEventListener('click', function(e) {
    if (e.target.hasAttribute('data-id')) {
      const dataId = e.target.getAttribute('data-id')
      console.log(`Element has data-id: ${dataId}`);
    } else {
      console.log('Element does not have data-id');
    }
  });
  