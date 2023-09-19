
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_q9uwLra7xZgTlHphHkhYwnA9WBndlSOvl8WosDdnIg6evQMibvXONhvsshbPv5Hk';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/images/favourites?limit=3&api_key=live_q9uwLra7xZgTlHphHkhYwnA9WBndlSOvl8WosDdnIg6evQMibvXONhvsshbPv5Hk';

const spanError = document.getElementById('error')

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    if(res.status !== 200) {

        spanError.innerHTML = 'Hubo un error' + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }
        
}

async function loadFavoritesCats() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    
    if(res.status !== 200) {

        spanError.innerHTML = 'Hubo un error' + res.status;
    } 
}

loadRandomCats();
loadFavoritesCats();