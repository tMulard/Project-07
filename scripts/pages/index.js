import { displayCardsOnPage} from '../factories/card.js';
import {getData, setDataInLocalStorage} from '../utils/data.js'
import { handleIngredients } from '../utils/handleIngredients.js';
import { handleAppliances } from '../utils/handleAppliances.js';
import { handleUtensils } from '../utils/handleUtensils.js';
      
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
  handleAppliances()
  handleUtensils()
};       

init();


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
  