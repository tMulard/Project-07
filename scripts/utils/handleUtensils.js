import { displayCardsOnPage } from "../factories/card.js";
import { ustensilListFactory } from "../factories/list.js";
import { createTag } from "../factories/tag.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";
import { removeDuplicates } from "./tools.js";

export const handleUtensils = () => {
    const button = document.querySelector("#filter3 .filterResult");
    const chevron = document.querySelector("#filterArrow3");
    const dropdown = document.querySelector('.utensilFilterList')

    // fonction déclechée par le click sur les li    
    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, "ustensilTag")
        chevron.classList.toggle("upsideDown");
        dropdown.classList.toggle("hidden");
        // filtrer les recettes -> display === false pour value !== utensil
         const filteredData = data.map((recipe) => {
            if (recipe.display === true) {
                const ustensils = recipe.ustensils
                
                if (!ustensils.some(ustensil => ustensil.toLowerCase() === value.toLowerCase())) {
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
            const filterList = document.querySelectorAll('.utensilFilter')
            
            //pour chaque li
            filterList.forEach((li) => {
                // on ne veut pas event l'input
                if (li.innerHTML !== "input") {
                    //on leur ajoute l'eventListener
                    li.addEventListener('click', onClickLi)
                }
               
            })
        } else {
            const filterList = document.querySelectorAll('.utensilFilter')
            filterList.forEach((li) => {
                li.removeEventListener('click', onClickLi)
            })
        }
    })

}

export const handleInputUtensil = () =>  {
    const input = document.querySelector('.inputSearchUstensil')
    const dropdown = document.querySelector('.utensilFilterList')
    const data = getDataFromLocalStorage();
    const chevron = document.querySelector("#filterArrow1");

    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, 'utensilTag')
        chevron.classList.toggle("upsideDown");
        dropdown.classList.toggle("hidden");
        // filtrer les recettes -> display === false pour value !== utensils
         const filteredData = data.map((recipe) => {
            if (recipe.display === true) {
                const ustensils = recipe.ustensils
                
                if (!ustensils.some(ustensil => ustensil.toLowerCase() === value.toLowerCase())) {
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
        
        // on cherche les ustensils en fonction de la value de l'input
        // créer un tableau de tous les ustensils des recettes affichées
        const utensilsToDisplay = data.map((recipe) => {
            // recherche uniquement sur les recettes qui sont déjà affichées
            if (recipe.display === true) {
                return recipe.ustensils
            }
            // return [];
         })

         const allUten = utensilsToDisplay.flat()
         const regex = new RegExp(value)
         const matches = allUten.filter(Uten => regex.test(Uten));

        ustensilListFactory(removeDuplicates(matches))


        // on récupère la liste des utensils
        const filterList = document.querySelectorAll('.utensilFilter')
    
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