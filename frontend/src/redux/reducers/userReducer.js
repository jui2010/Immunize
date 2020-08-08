import {SET_AUTHENTICATED_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, EDIT_USER_DETAILS } from '../types'

const initialState = {
    authenticatedUser : {
        // _id : "5f2b112eddcfd79ef18d26e2",
        // firstName : "Jui",
        // lastName : "Thombre",
        // email : "jui20oct@gmail.com"
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