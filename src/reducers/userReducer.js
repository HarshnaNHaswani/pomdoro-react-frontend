export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: { ...action.payload.userData },
        error: "",
        loading: '',
      };
    }

    case "CHANGE_PASSWORD": {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload.newPassword,
          updatedAt: action.payload.updatedAt,
        },
        error: "",
        loading: '',
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        loading: '',
        error: action.payload.error,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload.loadMsg,
      };
    }
    default:
      return state;
  }
};
