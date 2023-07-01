import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { }, action) =>{
    switch (action.type) {
        case AUTH:
            console.log(action?.data);
            break;
    
        default:
            return state;
    }

}

export default authReducer;

