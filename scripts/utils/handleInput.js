import { displayCardsOnPage } from "../factories/card.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";


export const handleInput = () =>  {
    const input = document.querySelector('.searchBar')
    let needRAZ = false;
    
    input.addEventListener('input', () => {
        const data = getDataFromLocalStorage();
        const regex = '/[^a-zA-Z]+/gm';
        const value = input.value.replace(regex, " ");
        // on fait rien
        if (value.length === 1) {
            needRAZ = false;
        }
        // faire la remise à zéro en fonction des tags déjà sélectionés
        else if (value.length === 2 && needRAZ) {
            needRAZ = false
            const ingredientsSelected = Array.from(document.querySelectorAll('.ingredientTag')).map((tag) => tag.innerText.toLowerCase())
            const appliancesSelected = Array.from(document.querySelectorAll('.applianceTag')).map((tag) => tag.innerText.toLowerCase())
            const ustensilsSelected = Array.from(document.querySelectorAll('.ustensilTag')).map((tag) => tag.innerText.toLowerCase())
            
            // 1 - récupérer toutes les data et tout mettre à display: true
            const clearRecipes = data.map((e) => ({...e, display: true}))
            
            // 2 - filtrer par ing
            const recipesFilteredByIngredient = clearRecipes.map((recipe) => {
                // chercher si la recette contient TOUT ingredientsSelected indexof (boucle)
                const recipeIngredients = recipe.ingredients.map((ing) => {
                    return ing.ingredient.toLowerCase();
                })

                if (ingredientsSelected.length === 0) {
                    recipe.display = true;
                } else {
                    const hasAllIngredients = ingredientsSelected.some(i => recipeIngredients.includes(i))
                    if (hasAllIngredients) {
                        recipe.display = true
                    } else {
                        recipe.display = false
                    }
                }
                return recipe
            })
           
            // 3 - filtrer par ustensil
            const recipesFilteredByUstensilAndIngredient = recipesFilteredByIngredient.map((recipe) => {
                // chercher si la recette contient TOUT ustensilsSelected indexof (boucle)
                const recipeUstensils = recipe.ustensils.map((ust) => ust.toLowerCase())
                if (ustensilsSelected.length > 0) {
                    const hasAllUstensils = ustensilsSelected.some(u => recipeUstensils.includes(u))
                    if (hasAllUstensils) {
                        recipe.display = true
                    } else {
                        recipe.display = false
                    }
                }
                return recipe
            })

            // // 4 - filtrer par appliance
            
            const finalRecipesFilteredByAll = recipesFilteredByUstensilAndIngredient.map((recipe) => {
                // chercher si la recette contient appliancesSelected indexof (boucle)
                const recipeApp = recipe.appliance.toLowerCase();
                                
                if (appliancesSelected.length > 0) {
                    if (appliancesSelected.includes(recipeApp)) {
                        recipe.display = true
                    } else {
                        recipe.display = false
                    }
                }
                return recipe
            })

            setDataInLocalStorage(finalRecipesFilteredByAll)
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

export const stringifyRecipe = (recipe) => {
    const name = recipe.name.toLowerCase()
    const description = recipe.description.toLowerCase()
    const ingredients = recipe.ingredients.map((ing) => ing.ingredient).join(' ').toLowerCase()
    const appliance = recipe.appliance.toLowerCase()
    const ustensils = recipe.ustensils.join(' ').toLowerCase()

    return `${name} ${description} ${ingredients} ${appliance} ${ustensils}`
}