import { displayCardsOnPage, displayStats} from '../factories/card.js';
import {getData, getDataFromLocalStorage, setDataInLocalStorage} from '../utils/data.js'
import { fillLists } from '../factories/list.js';
import { handleIngredients } from '../utils/handleIngredients.js';

const handleFilter = (data) => {
  const filter2 = document.querySelector("#filter2");
  const filter3 = document.querySelector("#filter3");
  
  const icon2 = document.querySelector("#filterArrow2");
  const icon3 = document.querySelector("#filterArrow3");
  const filterArea = document.querySelector(".filterSelectedArea")

    filter2.addEventListener("click", () => {
      const filters = filter2.querySelector('.applianceFilterList')
      const filterList = filter2.querySelectorAll('li')
      filterList.forEach((filterElt) => {
        filterElt.addEventListener("click", (e) => {
          // UI
          icon2.classList.toggle("upsideDown");
          filters.classList.toggle("hidden");
          
          // récupération de la valeure + création d'objet filtre avec texte
          const value = e.target.textContent;
          const filterElement = document.createElement("div")
          filterElement.classList.add("filterElement")
          const filterText = document.createElement("p")
          filterText.innerText = value;
          const filterClose = document.createElement("img")
          filterClose.classList.add("filterClose")
          filterClose.setAttribute("src", "../assets/close-svgrepo-com.svg")
          
          filterElement.appendChild(filterText);
          filterElement.appendChild(filterClose);
          filterArea.appendChild(filterElement);
          
          filters.classList.toggle("hidden");
          icon2.classList.toggle("upsideDown");
          // LOGIQUE D'AFFICHAGE (filtre sélectionné)
          
          });
        })
        filters.classList.toggle("hidden");
        icon2.classList.toggle("upsideDown");
      });
      filter3.addEventListener("click", () => {
        const filters = filter3.querySelector('.utensilFilterList')
        const filterList = filter3.querySelectorAll('li')
        filterList.forEach((filterElt) => {
          filterElt.addEventListener("click", (e) => {
            // UI
            icon3.classList.toggle("upsideDown");
            filters.classList.toggle("hidden");
            
            // récupération de la valeure + création d'objet filtre avec texte
            const value = e.target.textContent;
            const filterElement = document.createElement("div")
            filterElement.classList.add("filterElement")
            const filterText = document.createElement("p")
            filterText.innerText = value;
            const filterClose = document.createElement("img")
            filterClose.classList.add("filterClose")
            filterClose.setAttribute("src", "../assets/close-svgrepo-com.svg")
            
            filterElement.appendChild(filterText);
            filterElement.appendChild(filterClose);
            filterArea.appendChild(filterElement);
            
            filters.classList.toggle("hidden");
            icon3.classList.toggle("upsideDown");
            // LOGIQUE D'AFFICHAGE (filtre sélectionné)
            
            });
          })
          filters.classList.toggle("hidden");
          icon3.classList.toggle("upsideDown");
        });
        
        
      };
      
const topButton = document.querySelector(".topButton")
  topButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

const init = async () => {
  const data = await getData()
  const DATA = data.map((recipe) => ({...recipe, display: true}))
  
  setDataInLocalStorage(DATA)
  
  displayCardsOnPage();
  
  handleIngredients()


  fillLists(DATA)
  handleFilter(DATA)
};       

init();


// etape pour filtrer
// 1 - récupérer les recettes dans le localStorage ==> DONE

// 2 - filtrer UNIQUEMENT dans les recettes display = true
// (INGREDIENTS)

// 2.3 - filtrer les recettes (if champignon in recette.ingredients ALORS recette.display = true SINON recette.display = false)

// SIDES EFFECT DE BATARD
// (AFFICHAGE DES FILTRES UNIQUEMENTS CLICABLES)

// 3 - sauvegarder dans le localStorage ==> DONE
// 4 - displayCardsOnPage(); ==> DONE

// const searchBar = document.querySelector(".searchBar");
// searchBar.addEventListener("input", () => {
  //   const data = getDataFromLocalStorage();
  //   data.forEach((recipe) => {
    //     if (recipe.display === true) {
      //     }
      //   });
      // });
      
      const elementRemoving = (list, ing) => {
        for (let li = 0; li < list.length; li++) {
          if (list[li].innerText = ing.innerText) {
            list.removeChild(list[li])
          }
        }
      }