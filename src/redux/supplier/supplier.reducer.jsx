const supplier = (state, action) => {
  switch (action.type) {
    case "ADD_SUPPLIER":
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

export const suppliers = (state = [], action) => {
  switch (action.type) {
    case "ADD_SUPPLIER":
      return [...state, supplier(undefined, action)];
    case 'RECEIVE_SUPPLIERS':
      return action.data;
    default:
      return state;
  }
};