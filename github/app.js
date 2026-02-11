const user='20241058-afk';
const url = `https://api.github.com/users/${user}`;
//Cargar perfil
const cargarPerfil = () => {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Usuario no encontrado");
            }
            return res.json();
        })
    .then(data => {
    document.getElementById('profile-card').innerHTML = `
        <div class="profile-container">
        
            <div class="profile-left">
                <img src="${data.avatar_url}" class="avatar-profile">
            </div>

            <div class="profile-right">
                <h2>${data.name }</h2>
                <p class="bio">${data.bio}</p>

                <div class="info">
                    <span>📍 ${data.location }</span>
                    <span>👥 ${data.followers} seguidores</span>
                    <span>📦 ${data.public_repos} repositorios</span>
                </div>
            </div>
        </div>
    `;
})

};

//caragr repositorios
const cargarRepos = () => {
    const params = new URLSearchParams({
        sort: 'updated'
    });

    fetch(`${url}/repos?${params}`)
        .then(res => res.json())
        .then(repos => {
            const container = document.getElementById('repos-list');

            container.innerHTML = repos.map(repo => `
                <article class="repo-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sin descripción disponible'}</p>
                    <div class="stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank">Ver Proyecto</a>
                </article>
            `).join('');
        })
        .catch(error => console.error(error));
};

//cargar seguidores
const cargarseguidores = () => {
    fetch(`${url}/followers?per_page=5`)
        .then(res => res.json())
        .then(followers => {
            const container = document.getElementById('followers-list');

            if (followers.length === 0) {
                container.innerHTML = '<p>No tiene seguidores aún</p>';
                return;
            }

            container.innerHTML = followers.map(f => `
                <a href="${f.html_url}" target="_blank">
                    <img src="${f.avatar_url}" 
                         title="${f.login}" 
                         class="follower-img">
                    <h3>${f.login}</h3>
                </a>
            `).join('');
        })
        .catch(error => console.error(error));
};


//inicializamos la aplicación cargando el perfil, los repositorios y los seguidores
cargarPerfil();
cargarRepos();
cargarseguidores();