export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    case "products":
      return { ...state, products: action.payload };
    case "category":
      return { ...state, category: action.payload };
    case "signin":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: false };
    default:
      return state;
  }
};
