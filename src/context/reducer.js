export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    case "products":
      return { ...state, products: action.payload };
    case "category":
      return { ...state, category: action.payload };
    case "adminOrders":
      return { ...state, adminOrders: action.payload };
    case "orders":
      return { ...state, orders: action.payload };
    case "cart":
      return { ...state, cart: action.payload };
    case "icon":
      return { ...state, icon: !state.icon };
    case "signin":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: false };
    default:
      return state;
  }
};
