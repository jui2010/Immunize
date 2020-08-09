import {GET_VACCINE_CENTERS, GET_DAILY_STOCK, SELECTED_CENTER, BOOK_APPOINTMENT,SELECTED_DATE} from '../types'
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

//get all daywise stock and requests data 
export const bookAppointment = (details) => (dispatch) => {
    axios.post('http://127.0.0.1:5000/bookAppointment', details)
        .then(res => {
            dispatch({
                type : BOOK_APPOINTMENT,
                payload : details
            })
        })
        .catch(err => console.log(err) )
}

//set selected center from the map
export const setSelectedCenter = (selectedCenter) => (dispatch) => {
    dispatch({
        type : SELECTED_CENTER,
        payload : selectedCenter
    })
}

//set selected center from the map
export const setSelectedDate = (selectedDate) => (dispatch) => {
    dispatch({
        type : SELECTED_DATE,
        payload : selectedDate
    })
}