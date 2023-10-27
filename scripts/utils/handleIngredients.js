import { displayCardsOnPage } from "../factories/card.js";
import { createTag } from "../factories/tag.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";

export const handleIngredients = () => {
    const button = document.querySelector("#filter1 .filterResult");
    const chevron = document.querySelector("#filterArrow1");
    const dropdown = document.querySelector('.ingredientFilterList')
    
    // fonction déclechée par le clck sur les li    
    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value)
        chevron.classList.toggle("upsideDown");
        dropdown.classList.toggle("hidden");
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
        dropdown.classList.toggle("hidden");
        
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