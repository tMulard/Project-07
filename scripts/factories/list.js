import { getDataFromLocalStorage } from "../utils/data.js";
import { removeDuplicates } from "../utils/tools.js"

export const fillLists = () => {
    const recipes = getDataFromLocalStorage()

    const fullIngredients = recipes.map((recipe) => {
        if (recipe.display === true) {
            const ingredients = recipe.ingredients.map((el) => {
                return el.ingredient
            })
            return ingredients
        }
        return []
    }).flat();

    const fullUstensils = recipes.map((recipe) => {
        if (recipe.display === true) {
            return recipe.ustensils
        }
        return []
    }).flat()

    const fullAppliances = recipes.map((recipe) => {
        if (recipe.display === true) {
            return recipe.appliance;
        }
        return []
    }).flat()

    ingredientListFactory(removeDuplicates(fullIngredients));
    ustensilListFactory(removeDuplicates(fullUstensils));
    applianceListFactory(removeDuplicates(fullAppliances))
}

export const ingredientListFactory = (ingredients) => {
    // 1 - récupérer les ingrédients sélectionnées
    const selectedIngredients = Array.from(document.querySelectorAll(".ingredientTag"))
    const ingredientToRemove = selectedIngredients.map((tag) => tag.innerText)
    // 2 - les retirer de "ingredients"
    const filteredIngredients = ingredients.filter(ingr => !ingredientToRemove.includes(ingr)).flat()

    const list = document.querySelector('.ingredientFilterList');
    list.innerHTML = '';
    
    const inputContainer = document.createElement('div')
    inputContainer.classList.add("inputContainer")

    const input = document.createElement('input')
    input.classList.add(['inputSearchList'], ['inputSearchIngredient'])
    input.setAttribute("type", "text");
    
    const searchLogo = document.createElement("img")
    searchLogo.classList.add(["searchLogo"],["ingredientSearchLogo"]);
    searchLogo.setAttribute("src", "../assets/search-svgrepo-com.svg");
    
    inputContainer.appendChild(input)
    inputContainer.appendChild(searchLogo)
    list.appendChild(inputContainer)

    filteredIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.classList.add('filter')
        li.classList.add('ingredientFilter')
        li.innerText = ingredient;
        list.appendChild(li);
    });
}

// <list>
// <input>
// ..ingredients
// </list>

export const ustensilListFactory = (ustensils) => {
    // 1 - récupérer les ustensils sélectionnées
    const selectedUstensils = Array.from(document.querySelectorAll(".ustensilTag"))
    const ustensilToRemove = selectedUstensils.map((tag) => tag.innerText)
    // 2 - les retirer de "ustensils"
    const filteredUstensils = ustensils.filter(ust => !ustensilToRemove.includes(ust)).flat()

    const list = document.querySelector('.utensilFilterList');
    list.innerHTML = '';

    const inputContainer = document.createElement('div')
    inputContainer.classList.add("inputContainer")

    const input = document.createElement('input')
    input.classList.add(['inputSearchList'], ['inputSearchUstensil'])
    input.setAttribute("type", "text")

    const searchLogo = document.createElement("img")
    searchLogo.classList.add(["searchLogo"],["utensilSearchLogo"]);
    searchLogo.setAttribute("id", "utensilSearch")
    searchLogo.setAttribute("src", "../assets/search-svgrepo-com.svg");
    
    const labelSearch = document.createElement('label')
    labelSearch.classList.add("labelSearch")
    labelSearch.setAttribute("for", "utensilSearch")


    inputContainer.appendChild(input)
    labelSearch.appendChild(searchLogo)
    inputContainer.appendChild(labelSearch)
    list.appendChild(inputContainer)
    
    filteredUstensils.forEach(ustensil => {
        const li = document.createElement('li');
        li.classList.add('utensilFilter')
        li.innerText = ustensil;
        list.appendChild(li);
    });
}

export const applianceListFactory = (appliances) => {
    // 1 - récupérer les appliances sélectionnées
    const selectedAppliances = Array.from(document.querySelectorAll(".applianceTag"))
    const applianceToRemove = selectedAppliances.map((tag) => tag.innerText)
    // 2 - les retirer de "appliances"
    const filteredAppliances = appliances.filter(appl => !applianceToRemove.includes(appl)).flat()
    
    const list = document.querySelector('.applianceFilterList');
    list.innerHTML = '';

    const inputContainer = document.createElement('div')
    inputContainer.classList.add("inputContainer")

    const input = document.createElement('input')
    input.classList.add(['inputSearchList'], ['inputSearchAppliance'])
    input.setAttribute("type", "text")
    
    const searchLogo = document.createElement("img")
    searchLogo.classList.add(["searchLogo"],["applianceSearchLogo"]);
    searchLogo.setAttribute("src", "../assets/search-svgrepo-com.svg");
    
    inputContainer.appendChild(input)
    inputContainer.appendChild(searchLogo)
    list.appendChild(inputContainer)
    
    filteredAppliances.forEach(appliance => {
        const li = document.createElement('li');
        li.classList.add('applianceFilter')
        li.innerText = appliance;
        list.appendChild(li);
    });
}