function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

async function getCharacterName(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
}

async function updateFilms(filmsData) {
    const personSelect = document.getElementById('person-select');
    const orderSelect = document.getElementById('order-select');

    const cardFilm = document.getElementById('films-list');

    const orderedRelease = [...filmsData].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    const orderedEpisode = [...filmsData].sort((a, b) => a.episode_id - b.episode_id);

    const characters = [];
    let defaultsOptions = `<option value="">Selecione um personagem</option>
                           <option value="all">Todos</option>`;

    filmsData.forEach(film => {
        film.characters.forEach(character => {
            characters.push(character);
        });
    });

    const listUniquePerson = new Set(characters);
    const listUniqueEndPerson = Array.from(listUniquePerson).sort((a, b) => a.localeCompare(b)); 

    personSelect.innerHTML = `<option value="">Selecione um personagem</option>`;

    const characterNames = await Promise.all(listUniqueEndPerson.map(url => getCharacterName(url)));

    personSelect.innerHTML = defaultsOptions + characterNames.map(name => {
        return `<option value="${name}">${name}</option>`;
    }).join('');

    function renderFilms(films) {
        cardFilm.innerHTML = films.map((film, index) => {
            return `
            <li>
                <div class="card-film">
                    <h2 class="title-film">${film.title}</h2>
                    <div class="info-main">
                        <p>Episódio: ${film.episode_id}</p>
                        <p>Diretor: ${film.director}</p>
                        <p>Produtor: ${film.producer}</p>
                        <p>Lançamento: ${formatDateTime(film.release_date)}</p>
                    </div>
                    <div class="opening-crawl">
                        <h3 class="opening_crawl">Texto de Abertura:</h3>
                        <p>${film.opening_crawl}</p>
                    </div>
                    <div class="person">
                    <p><span id="characters-${index}">Carregando personagens...</span></p>
                    </div>
                </div>
            </li>
            `;
        }).join('');

        films.forEach((film, index) => {
            Promise.all(film.characters.slice(0, 15).map(character => 
                fetch(character).then(response => response.json())
            ))
                .then(characters => {
                    document.getElementById(`characters-${index}`).innerHTML = characters.length
                        ? `<h3 class="title-character">Personagens:<br></h3>` + characters.map(character => character.name).join("<br>")
                        : `Personagens: desconhecidos`;
                })
                .catch(() => {
                    document.getElementById(`characters-${index}`).textContent = `Personagens: desconhecidos`;
                });
        });
    }

    orderSelect.addEventListener('change', () => {
        const selectedOrder = orderSelect.value;

        if (selectedOrder === 'release') {
            renderFilms(orderedRelease);
        } else if (selectedOrder === 'episode') {
            renderFilms(orderedEpisode);
        }
    });

    personSelect.addEventListener('change', async () => {
        const selectedPerson = personSelect.value;

        const filteredFilms = selectedPerson === 'all' 
            ? filmsData 
            : await Promise.all(filmsData.map(async (film) => {
                const filmCharacters = await Promise.all(film.characters.map(getCharacterName));
                return filmCharacters.includes(selectedPerson) ? film : null;
            })).then(results => results.filter(film => film !== null));

        renderFilms(filteredFilms);
    });

    renderFilms(orderedRelease);
}

async function fetchFilmsData() {
    const url = `https://swapi.dev/api/films/`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || []; 
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        return []; 
    }
}

(async () => {
    const filmsData = await fetchFilmsData();
    updateFilms(filmsData);
})();
