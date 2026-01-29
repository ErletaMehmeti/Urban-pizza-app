document.addEventListener("DOMContentLoaded", () => {
  const citiesDiv = document.getElementById("cities");

  function renderCities(list, link) {
    citiesDiv.innerHTML = "";

    list.forEach(city => {
      const card = document.createElement("div");
      card.className = "city-card fade-in";

      card.innerHTML = `
        <h3>${city}</h3>
        <a href="${link}" class="order-btn">ORDER ONLINE</a>
      `;

      citiesDiv.appendChild(card);
    });
  }

  window.loadCities = function (country) {
    if (country === "kosove") {
      renderCities(
        ["PRISHTINË","PRIZREN","FERIZAJ","LIPJAN","DRENAS","SLLATINË"],
        "/views/kosov.html"
      );
    }

    if (country === "shqiperi") {
      renderCities(
        ["TIRANË","DURRËS","SHKODËR","ELBASAN","VLORË"],
        "/views/shqiperi.html"
      );
    }
  };

  loadCities("kosove");
});
