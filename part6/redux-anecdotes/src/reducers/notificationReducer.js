const reducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW":
      return action.data;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export const showNotification = (message) => {
  return {
    type: "SHOW",
    data: message,
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE",
  };
};

export default reducer;
