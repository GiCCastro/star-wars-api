function updatePerson(personData) {

    const genderSelect = document.getElementById('gender-select');
    const cardPerson = document.getElementById('person-list');

    const gender = [];
    let defaultsOptions = `<option value="">Selecione um gênero</option>
                           <option value="all">Todos</option>`;

    personData.forEach(person => {
        gender.push(person.gender)
    })

    const listUniqueGender = new Set(gender)
    const listUniqueEndGender = Array.from(listUniqueGender);

    genderSelect.innerHTML = defaultsOptions += listUniqueEndGender.map(gender => {
        return `
        <option value="${gender}">${gender}</option>
        `
    })

    genderSelect.addEventListener('change', () => {
        const selectedOption = genderSelect.value;
        const filterGender = selectedOption === 'all' ? personData : personData.filter(person => person.gender === selectedOption)

        cardPerson.innerHTML = filterGender.map((person, index) => {
            return `
            <li class="person-search">
            <div class="person">
                <h2>${person.name}</h2>
                <p>Gênero: ${person.gender}</p>
                <p>Altura: ${person.height}</p>
                <p>Peso: ${person.mass}</p>
                <a href="details.html?id=${index + 1}"><button class="link-product">Ver personagem</button></a>
            </div>
        </li>
            `
        }).join('');
    })

    cardPerson.innerHTML = personData.map((person, index) => {
        return `
          <li class="person-search">
            <div class="person">
                <h2>${person.name}</h2>
                <p>Altura: ${person.height}</p>
                <p>Peso: ${person.mass}</p>
                <a href="details.html?id=${index + 1}"><button class="link-product">Ver personagem</button></a>
            </div>
        </li>
        `;
    }).join('');

}

async function fetchPersonData(page) {
    const url = `https://swapi.dev/api/people/?page=${page}`;
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
    const personData = await fetchPersonData(1);
    updatePerson(personData);
})();
