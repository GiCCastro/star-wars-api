function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

function updatePerson(personDetails) {
    const person = document.getElementById('person-details');

    person.innerHTML =
        `   <div class="card-details">
                <h1  class="person-title">${personDetails.name}</h1>
                <div class="container-details">
                    <div class="info-details">
                        <p>Altura: ${personDetails.height}</p>
                        <p>Cor do cabelo: ${personDetails.hair_color}</p>
                        <p>Cor da pele: ${personDetails.skin_color}</p>
                        <p>Cor dos olhos: ${personDetails.eye_color}</p>
                        <p>Ano de nascimento: ${personDetails.birth_year}</p>
                        <p>Gênero: ${personDetails.gender}</p>
                        <p><span id="homeworld">Carregando planeta natal...</span></p>
                        <p><span id="species">Carregando espécies...</span></p>
                        <p><span id="vehicles">Carregando veículos...</span></p>
                        <p><span id="starships">Carregando naves espaciais...</span></p>
                    </div>
                    
                    <ul class="list-films" id="list-films">Carregando filmes...</ul>
                </div>
                <hr class="hr">
                <div class="footer-details">
                    <p>Criado em: ${formatDateTime(personDetails.created)}</p>
                    <p>Última edição: ${formatDateTime(personDetails.edited)}</p>
                    <a href="${personDetails.url}" target="_blank">Ver na API</a> 
                </div
            </div>   
        `;

    fetch(personDetails.homeworld)
        .then(response => response.json())
        .then(data => document.getElementById('homeworld').textContent = `Planeta Natal: ` + data.name)
        .catch(() => document.getElementById('homeworld').textContent = `Planeta Natal: desconhecido`);

    Promise.all(personDetails.films.map(film => fetch(film).then(response => response.json())))
        .then(films => {
            document.getElementById('list-films').innerHTML = `<h3 class="title">Filmes:</h3>` + films.map(film => {
                return `
            <li>
                <div class="film">
                    <h4>${film.title}</h4>
                    <p>Data de lançamento: ${formatDateTime(film.release_date)}</p>
                    <p>Diretor: ${film.director}</p>
                </div>
            </li>
                `;
            }).join('');
        })
        .catch(() => document.getElementById('list-films').textContent = `Filmes: desconhecidos`);

    Promise.all(personDetails.species.map(specie => fetch(specie).then(response => response.json())))
        .then(species => {
            document.getElementById('species').textContent = species.length ? `Espécies: ` + species.map(specie => specie.name).join(", ") : "Espécie: Humano";
        })
        .catch(() => document.getElementById('species').textContent = "Espécie: desconhecida");

    Promise.all(personDetails.vehicles.map(vehicle => fetch(vehicle).then(response => response.json())))
        .then(vehicles => {
            document.getElementById('vehicles').textContent = vehicles.length ? `Veículos: ` + vehicles.map(vehicle => vehicle.name).join(", ") : "Veículos: desconhecidos";
        })
        .catch(() => document.getElementById('vehicles').textContent = "Veículos: desconhecidos");

    Promise.all(personDetails.starships.map(starship => fetch(starship).then(response => response.json())))
        .then(starships => {
            document.getElementById('starships').textContent = starships.length ? `Naves Espaciais: ` + starships.map(starship => starship.name).join(", ") : "Naves Espaciais: desconhecidas";
        })
        .catch(() => document.getElementById('starships').textContent = "Naves Espaciais: desconhecidas");
}


const urlParams = new URLSearchParams(window.location.search);
const personId = urlParams.get('id');

async function fetchPersonDetails(personId) {
    const url = `https://swapi.dev/api/people/${personId}/`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        return [];
    }
}

(async () => {
    const personDetails = await fetchPersonDetails(personId);
    updatePerson(personDetails);
})();


