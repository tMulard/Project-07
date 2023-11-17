import { displayCardsOnPage } from "../factories/card.js";
import { ingredientListFactory } from "../factories/list.js";
import { createTag } from "../factories/tag.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";
import { removeDuplicates } from "./tools.js";

export const handleIngredients = () => {
    const button = document.querySelector("#filter1 .filterResult");
    const chevron = document.querySelector("#filterArrow1");
    const dropdown = document.querySelector('.ingredientFilterList')
    const filters = document.querySelector("#filter1 .filters");
    
    // fonction déclechée par le click sur les li    
    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, 'ingredientTag')
        chevron.classList.toggle("upsideDown");
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
        // filtrer les recettes -> display === false pour value !== ingredients
         const filteredData = data.map((recipe) => {
            if (recipe.display === true) {
                if (!recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === value.toLowerCase())) {
                    recipe.display = false;
                }
            }
            return recipe;
         })
         setDataInLocalStorage(filteredData);
         displayCardsOnPage();
    }
    
    button.addEventListener("click", () => {
        
        chevron.classList.toggle("upsideDown");
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
        // si la dropdown est ouverte
        if(!dropdown.classList.contains('hidden')) {
            // on récupère la liste    
            const filterList = document.querySelectorAll('.ingredientFilter')
                
            //pour chaque li
            filterList.forEach((li) => {
                // on ne veut pas event l'input
                if (li.innerHTML !== "input") {
                    //on leur ajoute l'eventListener
                    li.addEventListener('click', onClickLi)
                }
            })
        } else {
            const filterList = document.querySelectorAll('.ingredientFilter')
            filterList.forEach((li) => {
                li.removeEventListener('click', onClickLi)
            })
        }
    })
}

export const handleInputIngredient = () =>  {
    const input = document.querySelector('.inputSearchIngredient')
    const data = getDataFromLocalStorage();
    const chevron = document.querySelector("#filterArrow1");
    const filters = document.querySelector("#filter1 .filters");

    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, 'ingredientTag')
        chevron.classList.toggle("upsideDown");
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
        // filtrer les recettes -> display === false pour value !== ingredients
         const filteredData = data.map((recipe) => {
            if (recipe.display === true) {
                if (!recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === value.toLowerCase())) {
                    recipe.display = false;
                }
            }
            return recipe;
         })
         setDataInLocalStorage(filteredData);
         displayCardsOnPage();
    }

    input.addEventListener('input', () => {
        const value = input.value;

        // si moins de 3 caractères on ne fait rien
        if (value.length < 3) {
            return
        }
        
        // on cherche les ingrédients en fonction de la value de l'input
        // créer un tableau de tous les ingrédients des recettes affichées
        const ingredientsToDisplay = data.map((recipe) => {
            // recherche uniquement sur les recettes qui sont déjà affichées
            if (recipe.display === true) {
                return recipe.ingredients.map((el) => el.ingredient)
            }
            return [];
         })

         const allIng = ingredientsToDisplay.flat()
         const regex = new RegExp(value)
         const matches = allIng.filter(ing => regex.test(ing));

        ingredientListFactory(removeDuplicates(matches))


        // on récupère la liste des ingredients
        const filterList = document.querySelectorAll('.ingredientFilter')
    
        //pour chaque li
        filterList.forEach((li) => {
            // on ne veut pas event l'input
            if (li.innerHTML !== "input") {
                //on leur ajoute l'eventListener
                li.addEventListener('click', onClickLi)
            }
        })
    })
}