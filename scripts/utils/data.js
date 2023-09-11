export const getData = async () => {
    try {
      const response = await fetch('./data/recipes.js');
      const data = await response.js();
      return data;
    } catch (error) {
      console.log(error);
    }
  };