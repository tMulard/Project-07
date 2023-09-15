export const recipeCardFactory = (data) => {

    const picture = `assets/photos/${data.image}`;

    function getRecipeCardDOM() {
        const article = document.createElement("article");
        
        const upperSection = document.createElement("div");
        upperSection.classList.add("cardUp");

        const image = document.createElement("img");
        image.setAttribute("src", picture);
        
        const time = document.createElement("p");
        time.classList.add("time");
        time.innerText = `${data.time}mins`

        const lowerSection = document.createElement("div");
        lowerSection.classList.add("cardDown");

        const title = document.createElement("h2");
        title.innerText = data.name

        const recipe = document.createElement("div");
        recipe.classList.add("cardRecipe");

        const recipeTitle = document.createElement("h3");
        recipeTitle.innerText = "RECETTE"

        const description = document.createElement("p");
        description.innerText = data.description

        const ingredientList = document.createElement("div");
        ingredientList.classList.add("ingredientList");

        const ingredientTitle = document.createElement("h3");
        ingredientTitle.innerText = "INGREDIENTS"
        ingredientList.appendChild(ingredientTitle);

        // data.ingredients.array.forEach((ing) => {
        //     const ingredient = document.createElement("div");
        //     ingredient.classList.add("ingredientObject");

        //     const ingredientName = document.createElement("p");
        //     ingredientName.innerText = data.ingredients[ing].name

        //     const ingredientQuantity = document.createElement("p");
        //     ingredientQuantity.innerText = data.ingredients[ing].quantity

        //     ingredient.appendChild(ingredientName);
        //     ingredient.appendChild(ingredientQuantity);
        //     ingredientList.appendChild(ingredient);
        // });

        upperSection.appendChild(image);
        upperSection.appendChild(time);
        lowerSection.appendChild(title);
        recipe.appendChild(recipeTitle);
        recipe.appendChild(description);
        lowerSection.appendChild(recipe);
        lowerSection.appendChild(ingredientList);
        article.appendChild(upperSection);
        article.appendChild(lowerSection);

        return article;
    }

    return getRecipeCardDOM;
}

export const displayCardsOnPage = async (data) => {
    const cardList = document.querySelector(".cardList");

    data.forEach((recipe) => {
        const cardModel = recipeCardFactory(recipe);
        const cardDOM = cardModel.getRecipeCardDOM();
        cardList.appendChild(cardDOM);
    })
}


/*
const removeDuplicates = (arr) => {
    return [...new Set(arr)];
}

*/