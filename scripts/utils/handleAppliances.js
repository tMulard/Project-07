import { displayCardsOnPage } from "../factories/card.js";
import { createTag } from "../factories/tag.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";

export const handleAppliances = () => {
    const button = document.querySelector("#filter2 .filterResult");
    const chevron = document.querySelector("#filterArrow2");
    const dropdown = document.querySelector('.applianceFilterList')
    
    // fonction déclechée par le click sur les li    
    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, "applianceTag")
        chevron.classList.toggle("upsideDown");
        dropdown.classList.toggle("hidden");
        // filtrer les recettes -> display === false pour value !== appliance
        const filteredData = data.map((recipe) => {
            if (recipe.display === true) {
                if (recipe.appliance.toLowerCase() !== value.toLowerCase()) {
                    recipe.display = false;
                }
            }
            return recipe;
         })

         console.log(filteredData)

         setDataInLocalStorage(filteredData);
         displayCardsOnPage();
    }
    
    button.addEventListener("click", () => {
        
        chevron.classList.toggle("upsideDown");
        dropdown.classList.toggle("hidden");
        
        // si la dropdown est ouverte
        if(!dropdown.classList.contains('hidden')) {
            // on récupère la liste    
            const filterList = document.querySelectorAll('.applianceFilter')
                
            //pour chaque li
            filterList.forEach((li) => {
                // on ne veut pas event l'input
                if (li.innerHTML !== "input") {
                    //on leur ajoute l'eventListener
                    li.addEventListener('click', onClickLi)
                }
            })
        } else {
            const filterList = document.querySelectorAll('.applianceFilter')
            filterList.forEach((li) => {
                li.removeEventListener('click', onClickLi)
            })
        }
    })

}