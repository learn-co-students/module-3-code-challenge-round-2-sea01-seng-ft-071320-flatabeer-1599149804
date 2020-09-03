// Code here
let beerForm = document.querySelector('.description')
beerForm.addEventListener('submit', (e) => updateBeer(e))

const fetchBeers = () => {
fetch('http://localhost:3000/beers/1')
.then(res => res.json())
.then(beers => addContent(beers))
}
fetchBeers()

const addContent = (beers) => {
    let h2 = document.querySelector('h2')
    let img = document.querySelector('img')
    // let h3 = document.querySelector('h3')
    let textarea = document.querySelector('textarea')

    h2.innerText = beers.name
    img.src = beers.image_url
    // h3.innerText = beers.reviews
    textarea.innerText = beers.description

    beers.reviews.forEach(review => {
    let ul = document.querySelector('ul.reviews')
    let li = document.querySelector('li')
    li.textContent = review
    ul.appendChild(li)

})

const addNewReview = (e) => {

    e.preventDefault()
    let review = e.target[0].value
    let Ul = document.querySelector('.reviews')
    let newReview = document.createElement('li')
    newReview.textContent = review
    Ul.appendChild(newReview)
    console.log(newReview)
}

let reviewForm = document.querySelector('.review-form')
reviewForm.addEventListener('submit', (e) => addNewReview(e))

}

const updateBeer = (e) => {
    e.preventDefault()    
    let updatedInfo = e.target[0].value
    let oldInfo = document.querySelector('.description').querySelector('textarea')
    
    
    fetch(`http://localhost:3000/beers/1`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({description:updatedInfo})
    })
    .then(res => res.json())
    .then(json => {
      oldInfo.innerText = `${updatedInfo}`
    })
}


