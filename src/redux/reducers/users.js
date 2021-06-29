import actionTypes from '../actionsTypes';

const initialState = {
  users: {},
  isAuth: false,
};

const usersReducer = (state = initialState, action) => {
  console.log(action.users);
  switch (action.type) {
    case actionTypes.getUser:
      return {
        ...state,
        users: action.users,
        isAuth: true,
      };
    case actionTypes.logOut:
      localStorage.removeItem('token');
      return {
        ...state,
        users: {},
        isAuth: false,
      };
    case actionTypes.updateUser:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default usersReducer;
