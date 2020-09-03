// fetch requests

window.onload = fetchBeer = () => {
    fetch("http://localhost:3000/beers/1")
    .then(res => res.json())
    .then(displayBeerDetails)
}

// function getAllBeers() {
    // return fetch(`http://localhost:3000/beers`)
    //   .then(r => r.json());
    //   .then(json => console.log(json))
// }

// main functions

const displayBeerDetails = (beer) => {
    let details = document.createElement('div')
      details.innerHTML = `
        <div class='beer-details' id=${beer.id}>
            <h2>'${beer.name}'</h2>
            <img src='${beer.image_url}'>
            <form class='description'>
                <textarea>'${beer.description}'</textarea>
                <button>"Update Beer"</button>
            </form>
            <h3>"Leave A Review"</h3>
            <form class='review-form'>
                <textarea></textarea>
                <input type='submit' value='Submit Review'>
            </form>
            <h3>Customer Reviews</h3>
            <ul class='reviews'>
            </ul>
        </div>
      `
      const beerDetails = document.querySelector('div.beer-details')
      beerDetails.replaceWith(details)
      getAllReviewsForABeer(beer)
}

function getAllReviewsForABeer(beer){
    let ul = document.querySelector('.reviews')
    beer.reviews.forEach(review=> {
        let li = document.createElement('li')
        li.textContent = review
        ul.appendChild(li)
    })
}

function updateDescription(description, id){
    fetchBeer().then PATCH
}

function submitReview