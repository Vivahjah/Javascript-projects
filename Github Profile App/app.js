const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const APIURL = "https://api.github.com/users/";

const addReposToCard = (repos) => {
    const reposEl = document.getElementById('repos');

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repos');

        repoEl.href = repo.html_url;
        repoEl.target = " _blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);

    })

}

const getRepos = async(username) => {

    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);




}


const getUser = async(username) => {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();


    getRepos(username);
    createUserCard(respData);

}
const createUserCard = (user) => {
    const { avatar_url, name, followers, following, public_repos, bio } = user;

    const cardHTML = String.raw `
        <div class="card">
            <div >
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
                <div id="repos">

                </div>
            </div>
        </div>
    
    `;

    getRepos(user);
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