const numberOfBoxes = 24;

let response = fetch('https://api.jikan.moe/v4/top/characters');
response.then(function(res){
    return res.json();  
}).then(function(anime){
    for (let i = 0; i < numberOfBoxes; i++) {
    const div = document.createElement('div');          
    div.classList.add('item');              //-----Siya ang mag add ug class sa div
    div.innerHTML = `
        <a href ="single-page.html?id=${anime.data[i].mal_id}"><img class="img-ani" src="${anime.data[i].images.jpg.image_url}"></a>
        <div class="ani-title">${anime.data[i].name}</div>
    `;

    document.querySelector('.box').appendChild(div);
}
}).catch(function(error) {
    console.error('Error:', error); 
});
