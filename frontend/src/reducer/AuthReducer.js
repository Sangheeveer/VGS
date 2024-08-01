
const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};


const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_USER':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
              ...state,
              user: action.payload,
            };
            
          case 'DELETE_USER':
            localStorage.removeItem('user');
            return {
              ...state,
              user: null,
            };
            
          default:
            return state;
    }
}

export default authReducer;