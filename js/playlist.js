document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("playlistGrid");
    const emptyMessage = document.getElementById("emptyMessage");

    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

    function renderStars(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? "⭐" : "☆";
        }
        return stars;
    }

    function render() {
        grid.innerHTML = "";

        if (playlist.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        emptyMessage.style.display = "none";

        playlist.forEach((movie) => {
            const card = document.createElement("article");
            card.className = "playlist__card";

            card.innerHTML = `
        <img src="${movie.poster}" class="playlist__poster" />

        <div class="playlist__info">
          <h3 class="playlist__movie-title">${movie.title}</h3>
          <div class="playlist__rating">${renderStars(movie.rating)}</div>
        </div>

        <button class="playlist__remove">🗑</button>
      `;

            card.addEventListener("click", () => {
                window.location.href = `movie.html?id=${movie.id}`;
            });

            card.querySelector(".playlist__remove").addEventListener("click", (e) => {
                e.stopPropagation();
                playlist = playlist.filter((m) => m.id !== movie.id);
                localStorage.setItem("playlist", JSON.stringify(playlist));
                render();
            });

            grid.appendChild(card);
        });
    }

    render();
});
