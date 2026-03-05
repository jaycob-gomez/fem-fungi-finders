const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

// The current filters on the page when first loaded
const currentFilters = {
  season: "all",
  edible: "all",
};

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name; // season or edible
  currentFilters[filterType] = e.target.value; // actual value of what was selected for season and edible
  filterCards();
}

function filterCards() {
  cards.forEach((card) => {
    // Getting the value of the data attribute data-season
    const season = card.querySelector("[data-season]").dataset.season;
    // Getting the value of the data attribute data-edible
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === season;
    const matchesEdible = currentFilters.edible === edible;

    if (
      (matchesSeason || currentFilters.season === "all") &&
      (matchesEdible || currentFilters.edible === "all")
    ) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });
}
