import {SET_USERS, SET_REQUESTS, SET_VACCINE_CENTER ,GET_VACCINE_CENTERS,BOOK_APPOINTMENT,
    EDIT_APPOINTMENT,DELETE_APPOINTMENT, GET_DAILY_STOCK} from '../types'

const initialState = {
   users : [],
   appointmentRequests : [],
   vaccineCenters : [],
   dailyStockAndRequests : []
}

export default function (state = initialState, action){
   switch(action.type){
        case SET_USERS : 
        return {
            ...state,
            users : action.payload,
        }

        case SET_REQUESTS : 
        return {
            ...state,
            appointmentRequests : action.payload,
        }

        case GET_VACCINE_CENTERS : 
        return {
            ...state,
            vaccineCenters : action.payload,
        }

        case GET_DAILY_STOCK : 
        return {
            ...state,
            dailyStockAndRequests : action.payload,
        }

        // checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        case SET_VACCINE_CENTER : 
        return {
            ...state,
            vaccineCenters : [
                action.payload,
                ...state.vaccineCenters
            ]
        }
        
        case BOOK_APPOINTMENT : 
        return {
            ...state,
            appointmentRequests : [
                action.payload,
                ...state.appointmentRequests
            ]
        }
        
        case EDIT_APPOINTMENT : 
        let ind = state.appointmentRequests.findIndex(
            appointment => appointment._id === action.payload._id)
        state.appointmentRequests[ind] = action.payload
        return {
            ...state,
        }

            // checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        case DELETE_APPOINTMENT : 
        return {
            ...state,
            appointmentRequests : state.appointmentRequests.filter((appointment) => appointment._id !== action.payload),
        }

        default : 
            return {
                ...state
            }
   }
}