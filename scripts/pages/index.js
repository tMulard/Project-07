import { displayCardsOnPage, displayStats} from '../factories/card.js';
import {getData} from '../utils/data.js'
import { fillLists } from '../factories/list.js';

const handleFilter = (data) => {
    const filter1 = document.querySelector("#filter1");
    const filter2 = document.querySelector("#filter2");
    const filter3 = document.querySelector("#filter3");
    const allFilter = document.querySelectorAll(".filter");
    const icon1 = document.querySelector("#filterArrow1");
    const icon2 = document.querySelector("#filterArrow2");
    const icon3 = document.querySelector("#filterArrow3");
  
    filter1.addEventListener("click", () => {
      const filters = filter1.querySelector('.ingredientFilterList')
      filters.classList.toggle("hidden");
      icon1.classList.toggle("face_down");
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
  
    for (let i = 0; i < allFilter.length; i++) {
      allFilter[i].addEventListener("click", () => {
        // UI
        icon.classList.toggle("face_down");
        filters.classList.toggle("hidden");
  
        // récupération de la valeure + réécriture
        const value = allFilter[i].innerHTML;
        filterResult.innerHTML = value;
  
        // LOGIQUE D'AFFICHAGE (SORTING)
        const clickedFilter = allFilter[i].textContent;
        let filteredMedias = [];
  
        switch (clickedFilter) {
          case "Popularité":
            filteredMedias = medias.sort((mediaA, mediaB) => {
              return mediaB.likes - mediaA.likes;
            });
            break;
          case "Date":
            filteredMedias = medias.sort((mediaA, mediaB) => {
              return new Date(mediaA.date) - new Date(mediaB.date);
            });
            break;
          default:
            filteredMedias = medias.sort((mediaA, mediaB) => {
              return mediaA.title > mediaB.title;
            });
            break;
        }
  
        displayMedias(filteredMedias);
      });
    }
  };


const init = async () => {
    const data = await getData()
    displayCardsOnPage(data);
    displayStats(data);
    fillLists(data)
    handleFilter(data)
};       

init();