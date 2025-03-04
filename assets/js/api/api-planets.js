function updatePlanets(planetsData) {

    const cardPlanet = document.getElementById('planets-list');
    const ordainedResidents = planetsData.sort((a, b) => a.population - b.population);

    cardPlanet.innerHTML = ordainedResidents.map(planet => {
        return `
          <li>
            <div class="card-planet">
            <img width="64" height="64" src="https://img.icons8.com/ios-glyphs/64/ffffff/death-star.png" alt="death-star"/>
                
            <h2>${planet.name}</h2>
                <div class="info-planet">
                <p>População: ${planet.population}</p>
                <p>Clima: ${planet.climate}</p>
                <p>Gravidade: ${planet.gravity}</p>
                <p>Diâmetro: ${planet.diameter} km</p>
                <p>Período orbital: ${planet.orbital_period} dias</p>
                <p>Período de rotação: ${planet.rotation_period} horas</p>
                <p>Água superficial: ${planet.surface_water}</p>
                <p>Terreno: ${planet.terrain}</p>
                </div>
            </div>
        </li>
        `;
    }).join('');


}

async function fetchPlanetsData() {
    const url = `https://swapi.dev/api/planets/`;
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
    const planetsData = await fetchPlanetsData();
    updatePlanets(planetsData);
})();
