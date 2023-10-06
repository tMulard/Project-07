export const getData = async () => {
    try {
      const response = await fetch('./data/recipes.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('data'))
}

export const setDataInLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(data))
}