import { removeDuplicates } from "../utils/tools.js"

export const fillLists = (recipes) => {
    
    const fullIngredients = recipes.map((recipe) => {
        const ingredients = recipe.ingredients.map((el) => {
            return el.ingredient
        })
        return ingredients
    }).flat();

    const ingredients = removeDuplicates(fullIngredients)


    const ustensils = ['']
    const appliances = ['']

    ingredientListFactory(ingredients);
    ustensilListFactory(ustensils);
    applianceListFactory(appliances)
}

const ingredientListFactory = (ingredients) => {
    const list = document.querySelector('.ingredientFilterList');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.classList.add('filter')
        li.innerText = ingredient;
        list.appendChild(li);
    });
}

const ustensilListFactory = (ustensils) => {
    
}

const applianceListFactory = (appliances) => {
    
}