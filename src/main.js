import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import '/src/style.css';

//www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const cocktailGrid = document.querySelector('#cocktail-grid')



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


async function displayData(){
  let cards = ''
  const {data, errorVal} =  await fetchCocktails()
  const drinks = data?.drinks || [];
  if(!errorVal){
 drinks.forEach(cocktail => {
         cards += `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100">
            <img src="${cocktail.strDrinkThumb}" class="card-img-top square-img" alt="${cocktail.strDrink}" />
            <div class="card-body d-flex flex-column justify-content-between">
              <h3 class="card-title">${cocktail.strDrink}</h3>
              <div class="d-flex justify-content-start gap-2 mt-auto">
                <button class="btn btn-outline-primary">View</button>
                <button class="btn btn-outline-warning">
                  <i class="bi bi-star"></i> Favourite
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
  console.log(data)
}



searchBtn.addEventListener('click', async() => displayData()) 