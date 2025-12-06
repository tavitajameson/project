const players = [
    {
        name: "LeBron James",
        team: "Los Angeles Lakers",
        position: "Forward",
        number: 23,
        img: "images/lebron.jpg"
    },
    {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        position: "Guard",
        number: 30,
        img: "images/curry.jpg"
    },
    {
        name: "Giannis Antetokounmpo",
        team: "Milwaukee Bucks",
        position: "Forward",
        number: 34,
        img: "images/giannis.jpg"
    }
];

let favorites = JSON.parse(localStorage.getItem("favoritePlayers")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("playerList");

    players.forEach((player, index) => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
      <img src="${player.img}" alt="${player.name}" class="player-img">
      <h3>${player.name}</h3>
      <p><strong>Team:</strong> ${player.team}</p>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Number:</strong> ${player.number}</p>
      <button class="fav-btn" data-index="${index}">
        ${favorites.includes(player.name) ? "★ Favorited" : "☆ Add to Favorites"}
      </button>
    `;

        container.appendChild(card);
    });

    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", handleFavorite);
    });
});

function handleFavorite(event) {
    const index = event.target.getAttribute("data-index");
    const playerName = players[index].name;

    if (favorites.includes(playerName)) {
        favorites = favorites.filter(name => name !== playerName);
    } else {
        favorites.push(playerName);
    }

    localStorage.setItem("favoritePlayers", JSON.stringify(favorites));

    location.reload();
}
