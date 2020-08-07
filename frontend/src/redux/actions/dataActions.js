import {GET_VACCINE_CENTERS, GET_DAILY_STOCK, LOADING_DATA} from '../types'
import axios from 'axios'

//get all the vaccine centers
export const getVaccineCenters = () => (dispatch) => {
    axios.get('http://127.0.0.1:5000/allVaccineCenters')
        .then(res => {
            dispatch({
                type : GET_VACCINE_CENTERS,
                payload : res.data
            })
        })
        .catch(err => console.log(err ) )
}


//get all daywise stock and requests data 
export const getAllDailyStockAndRequests = () => (dispatch) => {
    axios.get('http://127.0.0.1:5000/allDailyStockAndRequests')
        .then(res => {
            dispatch({
                type : GET_DAILY_STOCK,
                payload : res.data
            })
        })
        .catch(err => console.log(err) )
 }
 