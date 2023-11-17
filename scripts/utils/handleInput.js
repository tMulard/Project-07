import { displayCardsOnPage } from "../factories/card.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";


export const handleInput = () =>  {
    const input = document.querySelector('.searchBar')
    let needRAZ = false;
    
    input.addEventListener('input', () => {
        const data = getDataFromLocalStorage();
        const value = input.value;
        
        // on fait rien
        if (value.length === 1) {
            needRAZ = false;
        }
        // faire la remise à zéro en fonction des tags déjà sélectionés
        else if (value.length === 2 && needRAZ) {
            needRAZ = false
            const ingredientsSelected = document.querySelectorAll('.ingredientTag')
            const appliancesSelected = document.querySelectorAll('.applianceTag')
            const ustensilsSelected = document.querySelectorAll('.ustensilTag')
            
            // 1 - récupérer toutes les data et tout mettre à display: true
            const clearRecipes = data.map((e) => ({...e, display: true}))
            
            // 2 - filtrer par ing
            const recipesFilteredByIngredient = clearRecipes.map((recipe) => {
                // chercher si la recettes contient TOUT ingredientsSelected indexof (boucle)
            })
            // 3 - filtrer par ustensil
            // 4 - filtrer par appliance
            
            setDataInLocalStorage(recipesFilteredByIngredient)
            displayCardsOnPage();
        }
        // au moins 3 characters
        else if (value.length > 2) {
            needRAZ = true;
            
            const filteredData = data.map((recipe) => {
                if (recipe.display) {
                    const recipeInString = stringifyRecipe(recipe)
                    if (!recipeInString.includes(value.toLowerCase())) {
                        recipe.display = false
                    }
                }
                return recipe
            })
            
            setDataInLocalStorage(filteredData)
            displayCardsOnPage();

        }
    })
}

const stringifyRecipe = (recipe) => {
    const name = recipe.name.toLowerCase()
    const description = recipe.description.toLowerCase()
    const ingredients = recipe.ingredients.map((ing) => ing.ingredient).join(' ').toLowerCase()
    const appliance = recipe.appliance.toLowerCase()
    const ustensils = recipe.ustensils.join(' ').toLowerCase()

    return `${name} ${description} ${ingredients} ${appliance} ${ustensils}`
}