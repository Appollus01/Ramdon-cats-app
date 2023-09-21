
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_q9uwLra7xZgTlHphHkhYwnA9WBndlSOvl8WosDdnIg6evQMibvXONhvsshbPv5Hk';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_q9uwLra7xZgTlHphHkhYwnA9WBndlSOvl8WosDdnIg6evQMibvXONhvsshbPv5Hk';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_q9uwLra7xZgTlHphHkhYwnA9WBndlSOvl8WosDdnIg6evQMibvXONhvsshbPv5Hk`;


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

        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavoriteCat(data[0].id);
        btn2.onclick = () => saveFavoriteCat(data[1].id);
        btn3.onclick = () => saveFavoriteCat(data[2].id);
    }
        
}

async function loadFavoriteCats() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    
    if(res.status !== 200) {

        spanError.innerHTML = 'Hubo un error' + res.status;
    } else {
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach( michi => { 
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');

            btn.appendChild(btnText);
            img.src =  michi.image.url;
            img.width = 350;

            btn.onclick = () => deleteFavoriteCat(michi.id);

            article.appendChild(img);
            article.appendChild(btn);

            section.appendChild(article);
        })
    }
}

async function saveFavoriteCat(id) {
    const res = await fetch (API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    const data = await res.json();

    if(res.status !== 200) {

        spanError.innerHTML = 'Hubo un error' + res.status;
    } else {
        console.log('guardado de favoritos');
        loadFavoriteCats();
    }
}

async function deleteFavoriteCat(id) {
    const res = await fetch (API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        
    });
    const data = await res.json();

    if(res.status !== 200) {

        spanError.innerHTML = 'Hubo un error' + res.status;
    } else {
        console.log('eliminado de favoritos');
        loadFavoriteCats();
    }

}

loadRandomCats();
loadFavoriteCats();