import { removeDuplicates } from "../utils/tools.js"

export const fillLists = (recipes) => {
    
    const fullIngredients = recipes.map((recipe) => {
        const ingredients = recipe.ingredients.map((el) => {
            return el.ingredient
        })
        return removeDuplicates(ingredients)
    }).flat();

    const fullUstensils = recipes.map((recipe) => {
        const ustensils = recipe.ustensils
        for (let i = 0; i < ustensils.length; i++) {
            return ustensils[i];
        }
    })

    const fullAppliances = recipes.map((recipe) => {
        return recipe.appliance;
    });

    const ingredients = removeDuplicates(fullIngredients)
    const ustensils = removeDuplicates(fullUstensils)
    const appliances = removeDuplicates(fullAppliances)

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
    const list = document.querySelector('.utensilFilterList');
    ustensils.forEach(ustensil => {
        const li = document.createElement('li');
        li.classList.add('filter')
        li.innerText = ustensil;
        list.appendChild(li);
    });
}

const applianceListFactory = (appliances) => {
    const list = document.querySelector('.applianceFilterList');
    appliances.forEach(appliance => {
        const li = document.createElement('li');
        li.classList.add('filter')
        li.innerText = appliance;
        list.appendChild(li);
    });
}