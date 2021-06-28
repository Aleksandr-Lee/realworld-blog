// import actionTypes from '../actionsTypes';

const initialState = {
  users: {},
  isAuth: false,
};

const usersReducer = (state = initialState, action) => {
  // console.log(action.user)
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        users: action.users,
        isAuth: true,
      };
    default:
      return state;
  }
};

export default usersReducer;
