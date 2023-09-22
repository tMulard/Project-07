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

    const ingredients = recipe.ingredients.map((el) => {
        return el.ingredient
    })

    ingredients.forEach(ingredient => {
            const ingredientContainer = document.createElement('div');
            ingredientContainer.classList.add('ingredientContainer')
            const ingredientName = document.createElement('p');
            ingredientName.classList.add('ingredientName')
            ingredientName.innerText = ingredient.name;
            const ingredientQuantity = document.createElement('p');
            ingredientQuantity.classList.add('ingredientQuantity')
            if (ingredient.unit === null) ingredientQuantity.innerText = ingredient.quantity;
            else ingredientQuantity.innerText = ingredient.quantity + ingredient.unit;

            ingredientContainer.appendChild(ingredientName);
            ingredientContainer.appendChild(ingredientContainer);
            ingredientGrid.appendChild(ingredientGrid)
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

export const displayCardsOnPage = async (data) => {
    const cardList = document.querySelector(".cardList");

    data.forEach((recipe) => {
        const cardModel = recipeCardFactory(recipe);
        cardList.appendChild(cardModel);
    })
}

export const displayStats = (data) => {
    let totalRecipes = 0;
  
    data.forEach((recipe) => {
      totalRecipes += 1;
    });
    const list = document.querySelector(".recipeList")
    const listNumberDisplayer = document.createElement("p")
    listNumberDisplayer.innerText = totalRecipes+`recettes`
    list.appendChild(listNumberDisplayer)
}


    // const list = document.querySelector('.ingredientFilterList');
    // ingredients.forEach(ingredient => {
    //     const li = document.createElement('li');
    //     li.classList.add('filter')
    //     li.innerText = ingredient;
    //     list.appendChild(li);
    // });