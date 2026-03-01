const form = document.getElementById("addMovieForm");
const imagePreview = document.getElementById("imagePreview");
const posterFileInput = document.getElementById("posterFile");
const posterUrlInput = document.getElementById("posterUrl");
const formTitle = document.getElementById("formTitle");

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

let imageValue = "";

// Cargar películas
const movies = JSON.parse(localStorage.getItem("userMovies")) || [];

// MODO EDITAR
let movieToEdit = null;
if (editId) {
    movieToEdit = movies.find((m) => m.id === Number(editId));

    if (movieToEdit) {
        formTitle.textContent = "Editar película";

        document.getElementById("title").value = movieToEdit.title;
        document.getElementById("platform").value = movieToEdit.platform;
        document.getElementById("rating").value = movieToEdit.rating;
        document.getElementById("synopsis").value = movieToEdit.synopsis;

        imageValue = movieToEdit.poster;
        imagePreview.src = imageValue;
    }
}

// Imagen por archivo
posterFileInput.addEventListener("change", () => {
    const file = posterFileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        imageValue = reader.result;
        imagePreview.src = imageValue;
    };
    reader.readAsDataURL(file);
});

// Imagen por URL
posterUrlInput.addEventListener("input", () => {
    if (posterUrlInput.value.trim()) {
        imageValue = posterUrlInput.value.trim();
        imagePreview.src = imageValue;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!imageValue) {
        alert("Agrega una imagen");
        return;
    }

    if (movieToEdit) {
        // EDITAR
        movieToEdit.title = document.getElementById("title").value;
        movieToEdit.platform = document.getElementById("platform").value;
        movieToEdit.rating = Number(document.getElementById("rating").value);
        movieToEdit.synopsis = document.getElementById("synopsis").value;
        movieToEdit.poster = imageValue;
    } else {
        // CREAR
        movies.push({
            id: Date.now(),
            title: document.getElementById("title").value,
            platform: document.getElementById("platform").value,
            rating: Number(document.getElementById("rating").value),
            synopsis: document.getElementById("synopsis").value,
            poster: imageValue,
            comments: []
        });
    }

    localStorage.setItem("userMovies", JSON.stringify(movies));
    window.location.href = "index.html";
});
