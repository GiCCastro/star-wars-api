# SWAPI Explorer 🚀

![SWAPI Explorer](https://i.pinimg.com/736x/a4/5e/e4/a45ee418aa77783d1a847190596d9796.jpg)

Bem-vindo ao SWAPI Explorer! Esta aplicação permite explorar personagens, planetas e filmes da saga Star Wars utilizando a API SWAPI.

## Funcionalidades

1. **Listar personagens:** Exibe os 10 primeiros personagens com nome, altura e peso.
2. **Detalhar um personagem:** Mostra todas as informações de um personagem selecionado.
3. **Filtrar por gênero:** Todos os produtos marcados como favoritos ficam armazenados em uma seção específica para visualização.
4. **Permite busca por personagens masculinos, femininos ou 'n/a'.** Cada produto possui uma página dedicada com informações detalhadas, incluindo imagem, descrição e preço.
5. **Listar filmes:** Mostra em quais filmes cada personagem apareceu.
6. **Organizar planetas:** Lista planetas ordenados pelo número de residentes.
7. **Recomendar a sequência de filmes:** Permite escolher a melhor ordem para assistir Star Wars com base em filtros como:
    - Ordem de lançamento (episódios na ordem em que foram lançados nos cinemas)
    - Ordem cronológica (eventos na linha do tempo da saga)
    - História de um personagem (exibe os filmes onde um personagem específico aparece)

## Tecnologias Utilizadas

- **HTML5** (Utilizado para estruturar as páginas da aplicação).
- **CSS3** (incluindo Flexbox e Media Queries para responsividade): Utilizado para estilizar as páginas e torná-las responsivas.
- **JavaScript** Utilizado para adicionar interatividade às páginas e realizar requisições à API SWAPI.
- **API SWAPI** Utilizada para obter dados sobre personagens, filmes e planetas do universo Star Wars.

## Como Rodar o Projeto

1. Clone o repositório:

    ```bash
    git clone https://github.com/GiCCastro/swapi-explorer.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd swapi-explorer
    ```

3. Abra o arquivo `index.html` em um navegador de sua preferência. 

4. Ou acessando o deploy: https://giccastro.github.io/swapi-explorer/

### Estrutura do projeto

\```markdown
swapi-explorer/
├── index.html
├── details.html
├── films.html
├── planets.html
├── assets/
│   ├── css/
│   │   ├── global/
│   │   │   └── global.css
│   │   ├── details.css
│   │   ├── films.css
│   │   ├── planets.css
│   │   ├── style.css
│   ├── images/
│   │   ├── favicon/
│   │   │   └── favicon-logo.png
│   │   └── logo.png
│   ├── js/
│   │   ├── api/
│   │   │   ├── api-details.js
│   │   │   ├── api-films.js
│   │   │   ├── api-main.js
│   │   │   └── api-planets.js
└── README.md
\```

### Conclusão

Este projeto demonstra habilidades em HTML5, CSS3 e JavaScript, utilizando a API SWAPI. A aplicação é responsiva e interativa, permitindo explorar personagens, filmes e planetas do universo Star Wars. Fique a vontade para explorar o código e me enviar o seu feedback!

