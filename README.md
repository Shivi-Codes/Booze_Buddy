# Booze Buddy - Cocktail Finder App 🍸

## Overview

Booze Buddy is a web application that helps users discover cocktails based on available ingredients. Users can search for cocktails by entering an ingredient, view detailed step-by-step mixing instructions, and save favorite cocktails for future reference.

## Deployment link for Main branch

```
boozebuddy.netlify.app
```

## Features

- **Home Page:** Search for cocktails by ingredient, view search results in a grid.
- **Cocktail Page:** View detailed cocktail information, including ingredients, instructions, and a video tutorial (if available).
- **Favorites Page:** Save and manage favorite cocktails using local storage.

## Technologies Used

- **Frontend:** HTML, CSS, Bootstrap, Vanilla JavaScript
- **API:** [TheCocktailDB API](https://www.thecocktaildb.com/api.php)
- **Storage:** LocalStorage for saving favorite cocktails
- **Build Tool:** [Vite](https://vitejs.dev/) for fast and optimized development

## Running the Project

Booze Buddy is built using Vite as a Vanilla JavaScript project. To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/boozebuddy.git
   cd boozebuddy
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the project in your browser at `http://localhost:5173/`.

## Branching Strategy & Code Review Process

We follow a feature-branch workflow to ensure a clean and structured development process.

### Creating a Branch

1. Fetch the latest changes and create a new branch:
   ```sh
   git checkout main
   git pull origin main
   git checkout -b task/ticket_4-create-cocktail-card
   ```

### Committing & Pushing Code

2. Add changes and commit with a meaningful message:
   ```sh
   git add .
   git commit -m "Implemented cocktail card component"
   ```
3. Push changes to the remote branch:
   ```sh
   git push origin task/ticket_4-create-cocktail-card
   ```

### Code Review & Merging

4. Create a pull request (PR) on GitHub:

   - Ensure your branch is up to date with `main`.
   - Request at least one team member to review the code.
   - The code author cannot merge their own PR; approval is required.

5. Once approved, merge the PR into `main`.

6. Delete the feature branch after merging:
   ```sh
   git branch -d task/ticket_4-create-cocktail-card
   git push origin --delete task/ticket_4-create-cocktail-card
   ```

## API Endpoints & Example Responses

### Search for Cocktails by Ingredient

```
GET https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=SEARCH_TERM
```

- ``: User input (spaces replaced with `\_`)
- **Response Example:**

```json
{
  "drinks": [
    {
      "strDrink": "Margarita",
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      "idDrink": "11007"
    },
    {
      "strDrink": "Tequila Sunrise",
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg",
      "idDrink": "11009"
    }
  ]
}
```

### Get Cocktail Details

```
GET https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=COCKTAIL_ID
```

- ``: Unique ID of a cocktail
- **Response Example:**

```json
{
  "drinks": [
    {
      "idDrink": "11007",
      "strDrink": "Margarita",
      "strCategory": "Ordinary Drink",
      "strAlcoholic": "Alcoholic",
      "strGlass": "Cocktail glass",
      "strInstructions": "Rub the rim of the glass with the lime slice...",
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      "strIngredient1": "Tequila",
      "strIngredient2": "Triple sec",
      "strIngredient3": "Lime juice",
      "strMeasure1": "1 1/2 oz",
      "strMeasure2": "1/2 oz",
      "strMeasure3": "1 oz",
      "strVideo": null
    }
  ]
}
```

## Page Descriptions

### Home Page

- **Navigation Bar:** Reusable navbar with links to Home and Favorites.
- **Hero Section:** Eye-catching banner with a call-to-action.
- **Search Bar:** Users can input an ingredient and search for cocktails.
- **Cocktail Grid:** Displays search results in a card format with a title, image, and action buttons.

### Cocktail Page

- **Title, Category, and Glass Type:** Displayed at the top.
- **Ingredients List:** Ingredients and measurements shown in a structured format.
- **Instructions:** Step-by-step guide for preparing the cocktail.
- **Video Link:** If available, a button to watch the cocktail tutorial.

### Favorites Page

- **Stored Cocktails:** Displays saved cocktails from LocalStorage.
- **Remove Button:** Allows users to delete cocktails from favorites.
