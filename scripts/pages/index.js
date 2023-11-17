import { displayCardsOnPage} from '../factories/card.js';
import {getData, setDataInLocalStorage} from '../utils/data.js'
import { handleIngredients, handleInputIngredient } from '../utils/handleIngredients.js';
import { handleAppliances, handleInputAppliance } from '../utils/handleAppliances.js';
import { handleInputUstensil, handleUstensils } from '../utils/handleUstensils.js';
import { handleInput } from '../utils/handleInput.js';
      
const topButton = document.querySelector(".topButton")
topButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

const init = async () => {
  const data = await getData()
  const DATA = data.map((recipe) => ({...recipe, display: true}))
  
  setDataInLocalStorage(DATA)
  
  displayCardsOnPage();
  
  // gestionaires des listes
  handleIngredients()
  handleAppliances()
  handleUstensils()

  // gestionnaires des inputs
  handleInputIngredient()
  handleInputAppliance()
  handleInputUstensil()
  handleInput()
};       

init();


// SIDES EFFECT DE BATARD
// (AFFICHAGE DES FILTRES UNIQUEMENTS CLICABLES)

// 3 - sauvegarder dans le localStorage ==> DONE
// 4 - displayCardsOnPage(); ==> DONE
