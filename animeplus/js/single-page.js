function getQueryStringByKey(queryString, key){
    let value = '';

    if(queryString.length){
        queryString.forEach((queryStr) => {
            let keyVal = queryStr.split('=');

            if(key == keyVal[0]){
                value = keyVal[1];
            }
        });

    }

    return value;
}

var queryString = location.search.replace('?', '').split('&');

var id = getQueryStringByKey(queryString, 'id');
console.log(id);

let response = fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
response.then(function(res){
    return res.json()
}).then(function(anime) {
    const div = document.createElement('div');    
    div.classList.add('second-page-title'); 

    const airedFrom = new Date(anime.data.aired.from).toLocaleDateString();
    const airedTo = anime.data.aired.to ? new Date(anime.data.aired.to).toLocaleDateString() : "Ongoing";

    let genresHTML = '';
    anime.data.genres.forEach(function(genre) {
        genresHTML += `<span>${genre.name}</span> `;
    });

    let producersHTML = '';
    anime.data.producers.forEach(function(producer) {
        producersHTML += `<span>${producer.name}</span> `;
    });
    
    let studiosHTML = '';
    anime.data.studios.forEach(function(studio) {
        studiosHTML += `<span>${studio.name}</span> `;
    });

    let licensorsHTML ='';
    anime.data.licensors.forEach(function(licensor) {
        licensorsHTML += `<span>${licensor.name}</span>`
    })

    let demographicsHTML ='';
    anime.data.demographics.forEach(function(demographic) {
        demographicsHTML +=`<span>${demographic.name}</span>`
    })
    div.innerHTML = `
        <div class="single-page-container">
            <div class="left-wrapper">
                <img src="${anime.data.images.jpg.image_url}" class="feature-image">
                <div class="detail-wrapper">
                    <ul>
                    <li class="info-text">English Title: ${anime.data.title_english}</li>
                    <li class="info-text">Status: ${anime.data.status}</li>
                    <li class="info-text">Aired: ${airedFrom} to ${airedTo}</li>
                    <li class="info-text">Type: ${anime.data.type}</li>
                    <li class="info-text">Episodes: ${anime.data.episodes}</li>
                    <li class="info-text">Genres: ${genresHTML}</li>
                    <li class="info-text">Demographics: ${demographicsHTML}</li>
                    <li class="info-text">Producers: ${producersHTML}</li>
                    <li class="info-text">Studios: ${studiosHTML}</li>
                    <li class="info-text">Licensors: ${licensorsHTML}</li>
                    <li class="info-text">Duration: ${anime.data.duration}</li>
                    <li class="info-text">Rating: ${anime.data.rating}</li>
                    <li class="info-text">Score: ${anime.data.score}</li>
                    <li class="info-text">Rank: ${anime.data.rank}</li>
                </ul>
                </div>
            </a>
            </div>
            <div class="right-wrapper">
                <div class="text-container">
                    <div class="title-wrapper">${anime.data.title}</div>
                    <div class="text-wrapper">${anime.data.synopsis}</div>
                </div>

                <div class="trailer-wrapper">
                    <div class="trailer-head"><h1>Trailer</h1></div>
                    <div class="trailer-box">
                        <iframe src="${anime.data.trailer.embed_url}"  
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>${anime.data.trailer.embed_url}</iframe>
                    </div>
                </div>  
            </div>      
        </div> 
    `;

    document.querySelector('.single-page-container').appendChild(div);
}).catch(function(error) {
    console.error('Error:', error);
});

