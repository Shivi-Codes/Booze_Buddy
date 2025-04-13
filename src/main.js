// imports - bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// css imports
import '/src/style.css';


//  dom elements
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const cocktailGrid = document.querySelector('#cocktail-grid')
const favGrid = document.querySelector('#fav-grid')

// global data - set when fetched
let cocktails = []
let favCocktails = JSON.parse(localStorage.getItem('favs')) ?? [];
console.log(favCocktails)

//  functions

//  fetch data - function
async function fetchCocktails(){
  const searchTerm = searchInput.value
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
const data = await response.json();
return {data, errorVal:null}
  } catch (err) {
    return {data:null, errorVal:err.message}
  }
}


function setFavourite(id) {
  const isDuplicate = favCocktails.some(cocktail => cocktail.idDrink === id);
  const favElement = document.querySelector(`[data-id="${id}"]`);

  if(isDuplicate){
    favCocktails = favCocktails.filter(cocktail => cocktail.idDrink !== id)
    localStorage.setItem('favs', JSON.stringify(favCocktails));
    favElement.classList.remove('btn-warning')
    favElement.classList.add('btn-outline-warning')
   favElement.innerHTML = ` ${favCocktails.some(fav => fav.idDrink === id) ? 'Clear Favourite' : '<i class="bi bi-star"></i> Favourite'}`
   if(window.location.pathname.includes('favourites.html')) {
      displayLocalStorageData();  // Refresh favorites page
    }
   console.log(favCocktails)
    return
  }

   const favToStore = cocktails.find(cocktail => cocktail.idDrink === id);
   favCocktails.push(favToStore);
   localStorage.setItem('favs', JSON.stringify(favCocktails));
   
  favElement.classList.remove('btn-outline-warning')
  favElement.classList.add('btn-warning')
    favElement.innerHTML = ` ${favCocktails.some(fav => fav.idDrink === id) ? 'Clear Favourite' : '<i class="bi bi-star"></i> Favourite'}`


    console.log(favCocktails)
}


// display data function
async function displayCocktailData(){
  let cards = ''
  const {data, errorVal} =  await fetchCocktails()
  cocktails = data?.drinks || [];
  
  console.log(cocktails)
  if(!errorVal){
 cocktails.forEach(cocktail => {
         cards += `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100">
            <img src="${cocktail.strDrinkThumb}" class="card-img-top square-img" alt="${cocktail.strDrink}" />
            <div class="card-body d-flex flex-column justify-content-between">
              <h3 class="card-title">${cocktail.strDrink}</h3>
              <div class="d-flex justify-content-start gap-2 mt-auto">
                <button class="btn btn-outline-primary">View</button>
                <button class="btn ${favCocktails.some(fav => fav.idDrink === cocktail.idDrink) ? 'btn-warning' : 'btn-outline-warning'} favourite-btn" data-id="${cocktail.idDrink}">
                  <i class="bi bi-star"></i> ${favCocktails.some(fav => fav.idDrink === cocktail.idDrink) ? 'Clear Favourite' : 'Favourite'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    cocktailGrid.innerHTML = cards;
    cocktailGrid.classList.remove('d-none')
  }

}

function displayLocalStorageData() {
  let favs= '';
  favCocktails.forEach(cocktail => {
    favs += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <img src="${cocktail.strDrinkThumb}" class="card-img-top square-img" alt="${cocktail.strDrink}" />
          <div class="card-body d-flex flex-column justify-content-between">
            <h3 class="card-title">${cocktail.strDrink}</h3>
            <div class="d-flex justify-content-start gap-2 mt-auto">
              <button class="btn btn-outline-primary">View</button>
              <button class="btn btn-warning favourite-btn" data-id="${cocktail.idDrink}">
                <i class="bi bi-star"></i> Clear Favourite
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  favGrid.innerHTML = favs;
  favGrid.classList.remove('d-none');
}

if(!window.location.pathname.includes('favourites.html') && !window.location.pathname.includes('recipes.html') )
{
searchBtn.addEventListener('click', async() => displayCocktailData()) 
}

if(!window.location.pathname.includes('favourites.html') && !window.location.pathname.includes('recipes.html') )
{
cocktailGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.favourite-btn');
  if (btn) {
    const id = btn.getAttribute('data-id');
    setFavourite(id);
  }
})
}


if(window.location.pathname.includes('favourites.html')) {
  favGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.favourite-btn');
  if (btn) {
    const id = btn.getAttribute('data-id');
    setFavourite(id);
  }
})
}


document.addEventListener('DOMContentLoaded', function() {
  // Only run on a specific page
  if (window.location.pathname.includes('favourites.html')) {
    displayLocalStorageData();
  }
});