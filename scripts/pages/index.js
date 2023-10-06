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
    const filterArea = document.querySelector(".filterSelectedArea")

    filter1.addEventListener("click", () => {
      const filters = filter1.querySelector('.ingredientFilterList')
      const filterList = filter1.querySelectorAll('li')
      filterList.forEach((filterElt) => {
        filterElt.addEventListener("click", (e) => {
          // UI
          icon1.classList.toggle(".upsideDown");
          filters.classList.toggle("hidden");
          
          // récupération de la valeure + création d'objet filtre avec texte
          const value = e.target.textContent;
          const filterElement = document.createElement("div")
          filterElement.classList.add(".filterElement")
          const filterText = document.createElement("p")
          filterText.innerText = value;
          const filterClose = document.createElement("img")
          filterClose.setAttribute("src", "../assets/close-svgrepo-com.svg")

          filterElement.appendChild(filterText);
          filterElement.appendChild(filterClose);
          filterArea.appendChild(filterElement);
          
          filters.classList.toggle("hidden");
          icon1.classList.toggle(".upsideDown");
          // LOGIQUE D'AFFICHAGE (filtre sélectionné)
          // const clickedFilter = e.target.textContent;
          // console.log(clickedFilter)
          // let cardList = document.querySelectorAll(".recipe")
          // cardList.forEach((recipe) => {
          //   if (!recipe.ingredientList.search(`${clickedFilter}`)) cardList.removeChild(recipe)
          // });

          filterClose.addEventListener("click", (e) => {
            filterArea.removeChild(filterElement)
          });
      });
    })
    filters.classList.toggle("hidden");
    icon1.classList.toggle(".upsideDown");
  });
    filter2.addEventListener("click", () => {
        const filters = filter2.querySelector('.applianceFilterList')
        const filterList = filter2.querySelectorAll('li')
      filterList.forEach((filterElt) => {
        filterElt.addEventListener("click", (e) => {
          // UI
          icon2.classList.toggle(".upsideDown");
          filters.classList.toggle("hidden");
          
          // récupération de la valeure + création d'objet filtre avec texte
          const value = e.target.textContent;
          const filterElement = document.createElement("div")
          const filterText = document.createElement("p")
          filterText.innerText = value;
          filterText.classList.add(".filterElement")
          
          filterElement.appendChild(filterText);
          filterArea.appendChild(filterElement);
          
          filters.classList.toggle("hidden");
          icon2.classList.toggle(".upsideDown");
          // LOGIQUE D'AFFICHAGE (filtre sélectionné)
          // const clickedFilter = e.target.textContent;
          // console.log(clickedFilter)
          // let cardList = document.querySelectorAll(".recipe")
          // cardList.forEach((recipe) => {
          //   if (!recipe.ingredientList.search(`${clickedFilter}`)) cardList.removeChild(recipe)
          // });
      });
    })
        filters.classList.toggle("hidden");
        icon2.classList.toggle("face_down");
      });
      filter3.addEventListener("click", () => {
        const filters = filter3.querySelector('.utensilFilterList')
        const filterList = filter3.querySelectorAll('li')
      filterList.forEach((filterElt) => {
        filterElt.addEventListener("click", (e) => {
          // UI
          icon3.classList.toggle(".upsideDown");
          filters.classList.toggle("hidden");
          
          // récupération de la valeure + création d'objet filtre avec texte
          const value = e.target.textContent;
          const filterElement = document.createElement("div")
          const filterText = document.createElement("p")
          filterText.innerText = value;
          filterText.classList.add(".filterElement")
          
          filterElement.appendChild(filterText);
          filterArea.appendChild(filterElement);
          
          filters.classList.toggle("hidden");
          icon3.classList.toggle(".upsideDown");
          // LOGIQUE D'AFFICHAGE (filtre sélectionné)
          // const clickedFilter = e.target.textContent;
          // console.log(clickedFilter)
          // let cardList = document.querySelectorAll(".recipe")
          // cardList.forEach((recipe) => {
          //   if (!recipe.ingredientList.search(`${clickedFilter}`)) cardList.removeChild(recipe)
          // });
      });
    })
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