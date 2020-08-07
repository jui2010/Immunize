import {SET_PREV_MONTH, SET_NEXT_MONTH} from '../types'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

const initialState = {
  notifications : [],
  currMonth : new Date()
}

export default function (state = initialState, action){
  switch(action.type){
      
      case SET_PREV_MONTH : 
        return {
            ...state,
            currMonth : subMonths(state.currMonth, 1 )
        }
      case SET_NEXT_MONTH : 
        return {
            ...state,
            currMonth : addMonths(state.currMonth, 1 )
        }
      default : 
          return {
              ...state
          }
  }
}