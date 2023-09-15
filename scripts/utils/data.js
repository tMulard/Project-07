export const getData = async () => {
    try {
      const response = await fetch('./data/recipes.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };