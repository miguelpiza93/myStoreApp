const product = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        id: action.id,
        description: action.description,
        amount: parseFloat(action.amount),
        category: action.category,
      };
    default:
      return state;
  }
};

export const products = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, product(undefined, action)];
    case 'RECEIVE_PRODUCTS':
      return action.data;
    default:
      return state;
  }
};