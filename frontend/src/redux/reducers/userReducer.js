import {SET_AUTHENTICATED_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, EDIT_USER_DETAILS } from '../types'

const initialState = {
    user : {},
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
                user : ''
            } 

        case SET_AUTHENTICATED_USER :
            return {
                ...state,
                loading : false,
                user : action.payload
            } 

        case LOADING_USER :
            return {
                ...state,
                loading : true
            }
        
        case EDIT_USER_DETAILS :
            return {
                ...state,
                otherUser : action.payload
            }
            
        default : 
            return {
                ...state
            }
    }
}