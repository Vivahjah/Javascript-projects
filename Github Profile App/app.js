const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const APIURL = "https://api.github.com/users/";

const getUser = async(user) => {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUserCard(respData);

}
const createUserCard = (user) => {
    const { avatar_url, name, followers, following, public_repos, bio } = user;

    const cardHTML = String.raw `
        <div class="card">
            <div class="img-container">
                <img class="avatar" src="${avatar_url}" alt="${name}">
            </div>
            <div class="user-info">
                <h2>${name}</h2>
                <p>${bio}</p>
                
                <ul class="info">
                    <li>${followers}<strong>Followers</strong></li>
                    <li>${following}<strong>Following</strong></li>
                    <li>${public_repos}<strong>Repos</strong></li>
                </ul>
            </div>
        </div>
    
    `;
    main.innerHTML = cardHTML;

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
    }


    search.value = "";


})
getUser('florinpop17');