export const groupWithCategory = (products) => {
    const categorized = {};
  
    products.forEach((element) => {
      if (categorized[element.category.id]) {
        categorized[element.category.id].products.push(element);
      } else {
        categorized[element.category.id] = {
          category: {
            id: element.category.id,
            name: element.category.name,
          },
          products: [element],
        };
      }
    });
    return Object.values(categorized);
  };