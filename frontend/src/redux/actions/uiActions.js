import { SET_PREV_MONTH, SET_NEXT_MONTH} from '../types'
import axios from 'axios'

export const getPrevMonth = () => (dispatch) => {
  dispatch({
      type : SET_PREV_MONTH
  })
}

export const getNextMonth = () => (dispatch) => {
  dispatch({
      type : SET_NEXT_MONTH
  })
}