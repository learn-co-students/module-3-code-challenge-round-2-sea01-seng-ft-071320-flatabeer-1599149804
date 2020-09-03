fetchAndRenderBeers();
fetchAndRenderBeer(1);
initClickEvents();
initSubmitEvents();

// Event Handling

// Click event - use instead of click for performance
function initClickEvents() {
  const menu = document.getElementById("beer-menu");
  const reviewList = document.querySelector("#beer-details > ul.reviews");

  menu.addEventListener("mouseup", handleMenuClick);
  reviewList.addEventListener("mouseup", handleReviewListClick);
}

function handleMenuClick(event) {
  if (event.target.matches("#beer-menu > li")) {
    fetchAndRenderBeer(event.target.dataset.beerId);
  }
}

function handleReviewListClick(event) {
  if (event.target.matches("ul.reviews > li")) {
    const beerId = event.target.parentElement.parentElement.dataset.current;
    const reviewList = event.target.parentElement;

    reviewList.removeChild(event.target);

    patchReviews(beerId, getReviewsFromReviewList(reviewList));
  }
}

// Submit Event
function initSubmitEvents() {
  const beerDescForm = document.querySelector(
    "#beer-details > form.description"
  );
  const reviewForm = document.querySelector("#beer-details > form.review-form");

  beerDescForm.addEventListener("submit", handleBeerDescSubmit);
  reviewForm.addEventListener("submit", handleReviewFormSubmit);
}

function handleBeerDescSubmit(event) {
  event.preventDefault();

  const beerId = event.target.parentElement.dataset.current;

  const description = event.target.description.value;

  patchDescription(beerId, description);
}

function handleReviewFormSubmit(event) {
  event.preventDefault();

  const beerId = event.target.parentElement.dataset.current;

  patchReviews(beerId, [...getReviewsFromReviewList(reviewList), review]);

  const reviewList = document.querySelector("ul.reviews");
  const review = event.target.review.value;

  reviewList.appendChild(renderReviewItem(review));

  event.target.review.value = "";
}

// DOM Manipulation
function renderBeers(beers) {
  const menu = document.getElementById("beer-menu");

  for (const beer of beers) {
    renderBeerToMenu(beer, menu);
  }
}

function renderBeer(beer) {
  const beerDetails = document.getElementById("beer-details");

  const beerName = beerDetails.getElementsByTagName("H2")[0];
  beerName.textContent = beer.name;

  const beerImage = beerDetails.getElementsByTagName("IMG")[0];
  beerImage.src = beer.image_url;

  const beerDesc = beerDetails.querySelector("form.description > textarea");
  beerDesc.value = beer.description;

  const beerReviews = beerDetails.querySelector("ul.reviews");

  for (review of beer.reviews) {
    beerReviews.appendChild(renderReviewItem(review));
  }

  setCurrentBeer(beer.id);
}

function renderBeerToMenu(beer, menu) {
  const li = document.createElement("li");
  li.classList.add("beer-li");
  li.dataset.beerId = beer.id;
  li.textContent = beer.name;

  menu.appendChild(li);
}

function renderReviewItem(review) {
  const reviewItem = document.createElement("li");

  reviewItem.textContent = review;

  return reviewItem;
}

function setCurrentBeer(beerId) {
  const beerDetails = document.getElementById("beer-details");

  beerDetails.dataset.current = beerId;
}

function getReviewsFromReviewList(reviewList) {
  return Array.from(reviewList.getElementsByTagName("LI")).map(getText);
}

function getText(element) {
  return element.textContent;
}

// API Calls
function fetchAndRenderBeers() {
  fetchBeers().then(renderBeers);
}

function fetchAndRenderBeer(beerId) {
  fetchBeer(beerId).then(renderBeer);
}

function fetchBeers() {
  return fetch(`http://localhost:3000/beers`).then((resp) => resp.json());
}

function fetchBeer(beerId) {
  return fetch(`http://localhost:3000/beers/${beerId}`).then((resp) =>
    resp.json()
  );
}

function patchDescription(beerId, description) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ description: description }),
  };

  fetch(`http://localhost:3000/beers/${beerId}`, configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}

function patchReviews(beerId, reviews) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ reviews: reviews }),
  };

  fetch(`http://localhost:3000/beers/${beerId}`, configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}
