const ADD_USER="ADD_USER";
const DELETE_USER="DELETE_USER";

export const addUser = (item) =>({
    type: ADD_USER,
    payload: item,
});

export const removeUser = () =>({
    type:DELETE_USER,
 
});