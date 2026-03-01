document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".chatbot__toggle");
    const windowChat = document.querySelector(".chatbot__window");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (!toggleBtn || !windowChat) return;

    toggleBtn.addEventListener("click", () => {
        windowChat.classList.toggle("active");
    });

    function addMessage(text, from = "bot") {
        const msg = document.createElement("div");
        msg.textContent = text;
        msg.style.margin = "0.4rem 0";
        msg.style.opacity = from === "bot" ? 0.85 : 1;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    addMessage(
        "👋 Hola, soy el asistente de PELIS+. Escribe 'ayuda' para ver qué puedo hacer."
    );

    function openMovieFromChat(text, movies) {
        const name = text.replace("abrir", "").trim();

        if (!name) {
            addMessage("Escribe: abrir + nombre de la película 🎬");
            return true;
        }

        const movie = movies.find((m) =>
            m.title.toLowerCase().includes(name)
        );

        if (!movie) {
            addMessage("No encontré esa película 😢");
            return true;
        }

        addMessage(`Abriendo "${movie.title}"... 🍿`);

        setTimeout(() => {
            window.location.href = `movie.html?id=${movie.id}`;
        }, 800);

        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const text = input.value.toLowerCase();
        addMessage(input.value, "user");
        input.value = "";

        const movies = JSON.parse(localStorage.getItem("userMovies")) || [];
        const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

        setTimeout(() => {
            // 🔥 ABRIR PELÍCULA DESDE CHAT
            if (text.startsWith("abrir")) {
                if (openMovieFromChat(text, movies)) return;
            }

            // 1 Saludos
            if (text.includes("hola") || text.includes("hey")) {
                addMessage("¡Hola! 🎬 ¿Buscas una recomendación?");
            }

            // 2 Despedida
            else if (text.includes("adios") || text.includes("bye")) {
                addMessage("¡Hasta luego! 🍿");
            }

            // 3 Qué es la app
            else if (text.includes("que es pelis")) {
                addMessage(
                    "PELIS+ es un catálogo personal para guardar, calificar y comentar películas."
                );
            }

            // 4 Playlist
            else if (text.includes("playlist")) {
                addMessage(`Tienes ${playlist.length} película(s) en tu playlist 🎶`);
            }

            // 5 Total películas
            else if (text.includes("cuantas peliculas")) {
                addMessage(`Tienes ${movies.length} película(s) guardadas 🎥`);
            }

            // 6 Recomendar aleatoria
            else if (text.includes("recomienda")) {
                if (movies.length === 0) {
                    addMessage("Aún no tienes películas guardadas 😢");
                } else {
                    const random =
                        movies[Math.floor(Math.random() * movies.length)];
                    addMessage(`Te recomiendo: "${random.title}" ⭐`);
                }
            }

            // 7 Mejor calificada
            else if (text.includes("mejor")) {
                if (!movies.length) return addMessage("No hay películas aún");
                const best = [...movies].sort((a, b) => b.rating - a.rating)[0];
                addMessage(`La mejor es "${best.title}" ⭐${best.rating}`);
            }

            // 8 Peor calificada
            else if (text.includes("peor")) {
                if (!movies.length) return addMessage("No hay películas aún");
                const worst = [...movies].sort((a, b) => a.rating - b.rating)[0];
                addMessage(`La peor es "${worst.title}" 😅`);
            }

            // 9 Plataformas
            else if (text.includes("plataforma")) {
                const platforms = [...new Set(movies.map((m) => m.platform))];
                addMessage(
                    platforms.length
                        ? `Usas estas plataformas: ${platforms.join(", ")}`
                        : "No has registrado plataformas aún"
                );
            }

            // 10 Agregar
            else if (text.includes("agregar")) {
                addMessage("Ve a 'Agregar' en el menú y llena el formulario 📋");
            }

            // 11 Eliminar
            else if (text.includes("eliminar")) {
                addMessage("Desde el detalle de la película puedes eliminarla 🗑️");
            }

            // 12 Editar
            else if (text.includes("editar")) {
                addMessage("En el detalle de la película puedes editar sus datos ✏️");
            }

            // 13 Comentarios
            else if (text.includes("comentario")) {
                addMessage("Puedes comentar dentro del detalle de cada película 💬");
            }

            // 14 PWA
            else if (text.includes("pwa")) {
                addMessage(
                    "Esta app es una PWA: puedes instalarla y usarla como app móvil 📱"
                );
            }

            // 15 Offline
            else if (text.includes("offline")) {
                addMessage("Sí 😎 funciona offline gracias al Service Worker");
            }

            // 16 Ayuda
            else if (text.includes("ayuda")) {
                addMessage(
                    "Comandos:\n" +
                    "- abrir nombre\n" +
                    "- recomienda\n" +
                    "- mejor / peor\n" +
                    "- cuantas peliculas\n" +
                    "- playlist\n" +
                    "- pwa / offline\n" +
                    "- agregar / eliminar / editar"
                );
            }

            // 17 Chiste
            else if (text.includes("chiste")) {
                addMessage(
                    "¿Por qué el programador fue al cine? 🎬 Porque quería ver bugs en 3D 😎"
                );
            }

            // 18 Easter egg
            else if (text.includes("berga")) {
                addMessage("😳 ey, respeta al bot");
            }

            // 19 Estado
            else if (text.includes("todo bien")) {
                addMessage("Todo joya 😎 funcionando al 100%");
            }

            // 20 Default
            else {
                addMessage("No entendí eso 😅 escribe 'ayuda'");
            }
        }, 500);
    });
});
