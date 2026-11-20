
export const initialState = {
  products: [],
  total: 0,
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return {
        ...state,
        products: action.payload?.products || [],
        total: action.payload?.total || 0,
      };

    case "UPDATE_CART":
      return {
        ...state,
        products: action.payload?.products || [],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: action.payload?.products || [],
      };

    case "CLEAR_CART":
      return {
        ...initialState,
      };

    case "CALCULATE_TOTAL":
      return {
        ...state,
        total: action.payload?.total || 0,
      };

    default:
      return state;
  }
};

export default shopReducer;

