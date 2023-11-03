export const createTag = (value) => {
  const filterArea = document.querySelector(".filterSelectedArea");
  const filterElement = document.createElement("div");
  filterElement.classList.add("filterElement");
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

