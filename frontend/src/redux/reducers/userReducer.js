import {SET_AUTHENTICATED_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, EDIT_USER_DETAILS } from '../types'

const initialState = {
    authenticatedUser : {
        _id:"5f2ebeb9ebd9270fe69fd85e",
        firstName:"Jui",
        lastName:"Thombre",
        profilePicture:"https://lh3.googleusercontent.com/a-/AOh14GgN7FFpwiW9NW9vvhqax-tyoBY6eVrCUI2BkU0oRr0",
        email:"jui20oct@gmail.com",
        username:"jui20oct",
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