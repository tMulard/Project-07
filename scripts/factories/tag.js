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
  });
};


///inputs
///effacer tag puis dom