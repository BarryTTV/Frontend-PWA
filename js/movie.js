const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));

const poster = document.getElementById("moviePoster");
const title = document.getElementById("movieTitle");
const synopsis = document.getElementById("movieSynopsis");
const ratingEl = document.getElementById("movieRating");
const platformEl = document.getElementById("moviePlatform");

const addToPlaylistBtn = document.getElementById("addToPlaylist");
const deleteBtn = document.getElementById("deleteMovieBtn");
const editBtn = document.getElementById("editMovieBtn");

const commentsList = document.getElementById("commentsList");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

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

let movies = getMovies();
let movie = movies.find(m => m.id === movieId);

if (!movie) {
    alert("Esta película ya no existe");
    window.location.href = "index.html";
}

// ===== RENDER =====
poster.src = movie.poster;
title.textContent = movie.title;
synopsis.textContent = movie.synopsis;
ratingEl.textContent = renderStars(movie.rating);
platformEl.textContent = `📺 ${movie.platform}`;

// ===== PLAYLIST =====
addToPlaylistBtn.addEventListener("click", () => {
    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

    if (playlist.some(p => p.id === movie.id)) {
        alert("Ya está en la playlist");
        return;
    }

    playlist.push(movie);
    localStorage.setItem("playlist", JSON.stringify(playlist));
    alert("Agregada a playlist 🎬");
});

// ===== EDITAR =====
editBtn.addEventListener("click", () => {
    window.location.href = `add-movie.html?id=${movie.id}`;
});

// ===== ELIMINAR =====
deleteBtn.addEventListener("click", () => {
    if (!confirm("¿Eliminar esta película?")) return;

    movies = movies.filter(m => m.id !== movie.id);
    saveMovies(movies);

    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    playlist = playlist.filter(m => m.id !== movie.id);
    localStorage.setItem("playlist", JSON.stringify(playlist));

    window.location.href = "index.html";
});

// ===== COMENTARIOS =====
function renderComments() {
    commentsList.innerHTML = "";

    if (!movie.comments || movie.comments.length === 0) {
        commentsList.innerHTML = "<p>No hay comentarios aún</p>";
        return;
    }

    movie.comments.forEach(c => {
        const p = document.createElement("p");
        p.textContent = c;
        commentsList.appendChild(p);
    });
}

commentForm.addEventListener("submit", e => {
    e.preventDefault();

    const text = commentInput.value.trim();
    if (!text) return;

    movie.comments.push(text);
    saveMovies(movies);

    commentInput.value = "";
    renderComments();
});

renderComments();
