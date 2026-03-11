const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");

// The current filters on the page when first loaded
const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name; // season or edible
  currentFilters[filterType] = e.target.value; // actual value of what was selected for season and edible

  if (!document.startViewTransition()) {
    filterCards();
    return;
  }

  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;

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
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    hasVisibleCards
      ? (noResultsMessage.hidden = true)
      : (noResultsMessage.hidden = false);
  });
}

function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
