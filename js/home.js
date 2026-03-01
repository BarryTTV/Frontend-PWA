const moviesContainer = document.querySelector(".movies");

function getMovies() {
    return JSON.parse(localStorage.getItem("userMovies")) || [];
}

function saveMovies(movies) {
    localStorage.setItem("userMovies", JSON.stringify(movies));
}

function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? "⭐" : "☆";
    }
    return stars;
}

function deleteMovie(id) {
    if (!confirm("¿Eliminar esta película?")) return;

    let movies = getMovies();
    movies = movies.filter((movie) => movie.id !== id);
    saveMovies(movies);

    // Limpiar también de playlist
    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    playlist = playlist.filter((movie) => movie.id !== id);
    localStorage.setItem("playlist", JSON.stringify(playlist));

    renderMovies(movies);
}

function renderMovies(movies) {
    moviesContainer.innerHTML = "";

    if (movies.length === 0) {
        moviesContainer.innerHTML = `
      <p class="movies__empty">
        No hay películas aún. Agrega la primera 🎬
      </p>
    `;
        return;
    }

    movies.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "movies__card";

        card.innerHTML = `
      <img src="${movie.poster}" class="movies__poster" />
      
      <div class="movies__info">
        <h3 class="movies__title">${movie.title}</h3>
        <div class="movies__rating">${renderStars(movie.rating)}</div>
      </div>

      <button class="movies__delete" title="Eliminar">🗑</button>
    `;

        // Ir al detalle
        card.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        // Eliminar (evita que abra el detalle)
        card.querySelector(".movies__delete").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteMovie(movie.id);
        });

        moviesContainer.appendChild(card);
    });
}

renderMovies(getMovies());
