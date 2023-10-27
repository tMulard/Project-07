import { getDataFromLocalStorage } from "../utils/data.js";

export const recipeCardFactory = (recipe) => {
    const picture = `assets/photos/${recipe.image}`;

    const article = document.createElement("article");
    article.classList.add("recipe")

    const upperSection = document.createElement("div");
    upperSection.classList.add("cardUp");

    const image = document.createElement("img");
    image.setAttribute("src", picture);
    image.classList.add("recipePhoto")
    
    const time = document.createElement("p");
    time.classList.add("time");
    time.innerText = `${recipe.time}mins`

    const lowerSection = document.createElement("div");
    lowerSection.classList.add("cardDown");

    const title = document.createElement("h2");
    title.innerText = recipe.name

    const cardRecipe = document.createElement("div");
    cardRecipe.classList.add("cardRecipe");

    const recipeTitle = document.createElement("h3");
    recipeTitle.innerText = "RECETTE"

    const description = document.createElement("p");
    description.innerText = recipe.description

    const ingredientList = document.createElement("div");
    ingredientList.classList.add("ingredientList");

    const ingredientTitle = document.createElement("h3");
    ingredientTitle.innerText = "INGREDIENTS"

    const ingredientGrid = document.createElement("div");
    ingredientGrid.classList.add("ingredientGrid");

    recipe.ingredients.forEach(ingredient => {
        const ingredientContainer = document.createElement('div');
        ingredientContainer.classList.add('ingredientContainer')
        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredientName')
        ingredientName.innerText = ingredient.ingredient;
        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('ingredientQuantity')
        if (!ingredient.unit) ingredientQuantity.innerText = ingredient.quantity;
        else ingredientQuantity.innerText = ingredient.quantity + ingredient.unit;
        
        ingredientContainer.appendChild(ingredientName);
        
        if (!ingredient.unit && !ingredient.quantity) ingredientQuantity.innerHTML = "<p></p>";
        else ingredientContainer.appendChild(ingredientQuantity);
        
        ingredientGrid.appendChild(ingredientContainer)
    });
    
    upperSection.appendChild(image);
    upperSection.appendChild(time);
    lowerSection.appendChild(title);
    cardRecipe.appendChild(recipeTitle);
    cardRecipe.appendChild(description);
    lowerSection.appendChild(cardRecipe);
    ingredientList.appendChild(ingredientTitle);
    ingredientList.appendChild(ingredientGrid);
    lowerSection.appendChild(ingredientList);
    article.appendChild(upperSection);
    article.appendChild(lowerSection);

    return article;
}


export const displayCardsOnPage = async () => {
    const data = getDataFromLocalStorage()
    const cardList = document.querySelector(".cardList");
    cardList.innerHTML = ''

    data.forEach((recipe) => {
        if (recipe.display === true) {
            const cardModel = recipeCardFactory(recipe);
            cardList.appendChild(cardModel);
        }
    })

    displayStats(data)
}

export const displayStats = (data) => {
    let totalRecipes = 0;
  
    data.forEach((recipe) => {
        if (recipe.display === true) {
            totalRecipes += 1;
        }
    });
    const list = document.querySelector(".recipeList")
    list.innerHTML = totalRecipes+` recettes`
}
