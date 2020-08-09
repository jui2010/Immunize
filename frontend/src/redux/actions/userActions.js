import {EDIT_USER_DETAILS} from '../types'
import axios from 'axios'

//edit user details
export const editUserDetails = (userDetails) => (dispatch) => {
    axios.post('http://127.0.0.1:5000/editUserDetails' , userDetails)
        .then(res => {
            dispatch({
                type : EDIT_USER_DETAILS,
                payload : userDetails
            })
        })
}
