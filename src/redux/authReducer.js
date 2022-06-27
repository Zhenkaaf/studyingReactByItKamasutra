import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data

      }
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: 'SET_USER_DATA', data: { userId, email, login, isAuth } });

export const setAuthUserDataThunkCreator = () => {
  return (dispatch) => {
    return authAPI.me()
      .then(response => {
        if (response.data.resultCode === 0) {
          let { id, login, email } = response.data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      });
  }
}
export const loginThunkCreator = (email, password, rememberMe, setStatus) => {
  alert('work');
  
  return (dispatch) => {
    authAPI.login(email, password, rememberMe)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setAuthUserDataThunkCreator());
        }
        else {
          setStatus(response.data.messages);
        }
      });
  }
}
export const logoutThunkCreator = () => {
  return (dispatch) => {
    authAPI.logout()
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false));
        }
      });
  }
}




export default authReducer;