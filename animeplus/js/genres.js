const numberOfBoxes = 100;

let response = fetch('https://api.jikan.moe/v4/genres/anime');
response.then(function(res){
    return res.json();  
}).then(function(anime){
    for (let i = 0; i < numberOfBoxes; i++) {
    const div = document.createElement('div');          
    div.classList.add('item');              //-----Siya ang mag add ug class sa div
    div.innerHTML = `
        <ul class="genres-detail">
            <li>
            ${anime.data[i].name}
            </li>
        </ul>
    `;

    document.querySelector('.box').appendChild(div);
}
}).catch(function(error) {
    console.error('Error:', error); 
});
