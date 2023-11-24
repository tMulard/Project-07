import { getDataFromLocalStorage, setDataInLocalStorage } from "../utils/data.js";
import { displayCardsOnPage } from "./card.js";

export const createTag = (value, type) => {
  const filterArea = document.querySelector(".filterSelectedArea");
  const filterElement = document.createElement("div");
  filterElement.classList.add("filterElement");
  filterElement.classList.add(type);
  const filterText = document.createElement("p");
  filterText.innerText = value;
  const filterClose = document.createElement("img");
  filterClose.classList.add("filterClose");
  filterClose.setAttribute("src", "../assets/close-svgrepo-com.svg");

  filterElement.appendChild(filterText);
  filterElement.appendChild(filterClose);
  filterArea.appendChild(filterElement);

  filterClose.addEventListener("click", (e) => {
    filterArea.removeChild(filterElement)
    closeTag()
  });
};

export const closeTag = (event) => {
  const data = getDataFromLocalStorage();
  const ingredientsSelected = Array.from(document.querySelectorAll('.ingredientTag')).map((tag) => tag.innerText.toLowerCase())
  const appliancesSelected = Array.from(document.querySelectorAll(".applianceTag")).map((tag) => tag.innerText.toLowerCase());
  const ustensilsSelected = Array.from(document.querySelectorAll(".ustensilTag")).map((tag) => tag.innerText.toLowerCase());
  
  // 1 - récupérer toutes les data et tout mettre à display: true
  const clearRecipes = data.map((e) => ({ ...e, display: true }));
  
  // 2 - filtrer par ing
  const recipesFilteredByIngredient = clearRecipes.map((recipe) => {
    // chercher si la recette contient TOUT ingredientsSelected indexof (boucle)
    const recipeIngredients = recipe.ingredients.map((ing) => {
      return ing.ingredient.toLowerCase();
    });
  
    if (ingredientsSelected.length === 0) {
      recipe.display = true;
    } else {
      const hasAllIngredients = ingredientsSelected.some((i) =>
        recipeIngredients.includes(i)
      );
      if (hasAllIngredients) {
        recipe.display = true;
      } else {
        recipe.display = false;
      }
    }
    return recipe;
  });
  
  // 3 - filtrer par ustensil
  const recipesFilteredByUstensilAndIngredient =
    recipesFilteredByIngredient.map((recipe) => {
      // chercher si la recette contient TOUT ustensilsSelected indexof (boucle)
      const recipeUstensils = recipe.ustensils.map((ust) =>
        ust.toLowerCase()
      );
      if (ustensilsSelected.length > 0) {
        const hasAllUstensils = ustensilsSelected.some((u) =>
          recipeUstensils.includes(u)
        );
        if (hasAllUstensils) {
          recipe.display = true;
        } else {
          recipe.display = false;
        }
      }
      return recipe;
    });
  
  // 4 - filtrer par appliance
  
  const finalRecipesFilteredByAll =
    recipesFilteredByUstensilAndIngredient.map((recipe) => {
      // chercher si la recette contient appliancesSelected indexof (boucle)
      const recipeApp = recipe.appliance.toLowerCase();
  
      if (appliancesSelected.length > 0) {
        if (appliancesSelected.includes(recipeApp)) {
          recipe.display = true;
        } else {
          recipe.display = false;
        }
      }
      return recipe;
    });
  
  setDataInLocalStorage(finalRecipesFilteredByAll);
  displayCardsOnPage();
}

///inputs
///effacer tag puis dom