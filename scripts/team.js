// teams.js - NBA Fan Hub
// Dynamically generates team cards and allows users to view basic info.

// Sample team data (you can expand this later)
const teams = [
    {
        name: "Los Angeles Lakers",
        city: "Los Angeles",
        conference: "West",
        championships: 17,
        logo: "images/lakers.png"
    },
    {
        name: "Golden State Warriors",
        city: "San Francisco",
        conference: "West",
        championships: 7,
        logo: "images/warriors.png"
    },
    {
        name: "Boston Celtics",
        city: "Boston",
        conference: "East",
        championships: 17,
        logo: "images/celtics.png"
    }
];

// Render team cards to the page
function renderTeams() {
    const container = document.getElementById("teamContainer");

    if (!container) return;

    container.innerHTML = teams
        .map(team => {
            return `
        <div class="team-card">
          <img src="${team.logo}" alt="${team.name} logo" class="team-logo" />
          <h2>${team.name}</h2>
          <p><strong>City:</strong> ${team.city}</p>
          <p><strong>Conference:</strong> ${team.conference}</p>
          <p><strong>Championships:</strong> ${team.championships}</p>
        </div>
      `;
        })
        .join("");
}

// Initialize once page loads
document.addEventListener("DOMContentLoaded", renderTeams);
