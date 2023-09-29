import { displayCardsOnPage, displayStats} from '../factories/card.js';
import {getData} from '../utils/data.js'
import { fillLists } from '../factories/list.js';

const handleFilter = (data) => {
    const filter1 = document.querySelector("#filter1");
    const filter2 = document.querySelector("#filter2");
    const filter3 = document.querySelector("#filter3");
    const icon1 = document.querySelector("#filterArrow1");
    const icon2 = document.querySelector("#filterArrow2");
    const icon3 = document.querySelector("#filterArrow3");
    const filterArea = document.querySelector(".filterArea")

    filter1.addEventListener("click", () => {
      const filters = filter1.querySelector('.ingredientFilterList')
      filters.classList.toggle("hidden");
      icon1.classList.toggle(".upsideDown");

      for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", () => {
          // UI
          icon1.classList.toggle(".upsideDown");
          filter1.classList.toggle("hidden");
    
          // récupération de la valeure + création d'objet filtre avec texte
          const value = filters[i].innerText;
          const filterElement = document.createElement("div")
          const filterText = document.createElement("p")
          filterText.innerText = value;

          filterElement.appendChild(filterText);
          filterArea.appendChild(filterElement);
    
          // LOGIQUE D'AFFICHAGE (filtre sélectionné)
          const clickedFilter = filters[i].textContent;
          
          let cardList = document.querySelector("cardList")
          cardList.array.forEach((recipe) => {
            if (!recipe.ingredientList.search(`${clickedFilter.innerText}`)) cardList.removeChild(recipe)
          });
        });
      }
    });
    filter2.addEventListener("click", () => {
        const filters = filter2.querySelector('.applianceFilterList')
        filters.classList.toggle("hidden");
        icon2.classList.toggle("face_down");
      });
      filter3.addEventListener("click", () => {
        const filters = filter3.querySelector('.utensilFilterList')
        filters.classList.toggle("hidden");
        icon3.classList.toggle("face_down");
      });
  
    
  };

const topButton = document.querySelector(".topButton")
topButton.addEventListener("click", (e) => {
  window.scrollTo(0, 0);
});

const init = async () => {
    const data = await getData()
    displayCardsOnPage(data);
    displayStats(data);
    fillLists(data)
    handleFilter(data)
};       

init();