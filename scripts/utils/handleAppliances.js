import { displayCardsOnPage } from "../factories/card.js";
import { applianceListFactory } from "../factories/list.js";
import { createTag } from "../factories/tag.js";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./data.js";
import { removeDuplicates } from "./tools.js";

export const handleAppliances = () => {
    const button = document.querySelector("#filter2 .filterResult");
    const chevron = document.querySelector("#filterArrow2");
    const dropdown = document.querySelector('.applianceFilterList')
    const filters = document.querySelector("#filter2 .filters");
    
    // fonction déclechée par le click sur les li    
    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, "applianceTag")
        chevron.classList.toggle("upsideDown");
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
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
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
        
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


export const handleInputAppliance = () =>  {
    const input = document.querySelector('.inputSearchAppliance')
    const data = getDataFromLocalStorage();
    const chevron = document.querySelector("#filterArrow2");
    const filters = document.querySelector("#filter2 .filters");
    

    const onClickLi = (event) => {
        const value = event.target.innerHTML
        const data = getDataFromLocalStorage();
        createTag(value, "applianceTag")
        chevron.classList.toggle("upsideDown");
        filters.classList.toggle("hidden");
        filters.classList.toggle("showBorder");
        
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

    input.addEventListener('input', () => {
        const value = input.value;

        // si moins de 3 caractères on ne fait rien
        if (value.length < 3) {
            return
        }
        
        // on cherche les apprliances en fonction de la value de l'input
        // créer un tableau de tous les appliances des recettes affichées
        let applianceToDisplay = [];
        data.forEach((recipe) => {
            // recherche uniquement sur les recettes qui sont déjà affichées
            if (recipe.display === true) {
                applianceToDisplay.push(recipe.appliance)
            }
            return [];
         })

         const allapp = applianceToDisplay.flat()
         const regex = new RegExp(value)
         const matches = allapp.filter(app => regex.test(app));

        applianceListFactory(removeDuplicates(matches))


        // on récupère la liste des appliance
        const filterList = document.querySelectorAll('.applianceFilter')
    
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