import {SET_AUTHENTICATED_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, EDIT_USER_DETAILS } from '../types'

const initialState = {
    authenticatedUser : {
        _id : "123"
    },
    authenticated : false,
    loading : false
}

export default function(state = initialState , action){
    switch(action.type){
        case SET_AUTHENTICATED :
            return {
                ...state,
                authenticated : true
            }

        case SET_UNAUTHENTICATED :
            return {
                ...state,
                authenticated : false,
                authenticatedUser : ''
            } 

        case SET_AUTHENTICATED_USER :
            return {
                ...state,
                loading : false,
                authenticatedUser : action.payload
            } 

        case LOADING_USER :
            return {
                ...state,
                loading : true
            }
        
        case EDIT_USER_DETAILS :
            return {
                ...state,
                authenticatedUser : action.payload
            }
            
        default : 
            return {
                ...state
            }
    }
}