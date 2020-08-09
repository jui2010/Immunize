import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import format from "date-fns/format"

import withStyles from '@material-ui/core/styles/withStyles'
import addDays from 'date-fns/addDays'

import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import subDays from 'date-fns/subDays'

import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

import {connect} from 'react-redux'
import CalendarDayCell from './CalendarDayCell'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
  }, 
  weekday : {
    width: theme.spacing(11),
    height: theme.spacing(2),
    color : 'white',
    display: 'flex',
    justifyContent:'center',
    backgroundColor : '#484848',
    textTransform : 'uppercase',
    fontSize : '12px'
  },
  dayTopFrame : {
    display: 'flex',
    flexDirection : 'row'
  },
})

export class CalendarCellFrame extends Component {
    state = {
        isHovering: false,
    }

    handleMouseHover = () => {
        this.setState({
            isHovering : true
        })
    }

    handleMouseNoHover = () => {
        this.setState({
            isHovering : false
        })
    }

    showDays(){
        const {classes } = this.props 
        const { currMonth } = this.props.ui

        const days = []
        let startDate = startOfWeek(currMonth)
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className={classes.weekday}>
                    <b>
                        {format(addDays(startDate, i), "EEEE")}
                    </b>
                </div>
            )
        }
        return <Grid container  justify="space-evenly" alignItems="center" >{days}</Grid>; 
    }

    showCells(){
        const { currMonth } = this.props.ui
        const monthStart = startOfMonth(currMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart) //start date from prev month
        const endDate = endOfWeek(monthEnd) //end date from prev month

        const rows = [] //there can be 5-6 rows depending on the number of weeks
        let cells = []

        
        let day = startDate
        while (day <= endDate) { //determines number of rows
            for(let j=0; j<7 ;j++){
                let d = getDate(day)
                let m = getMonth(day)
                let y = getYear(day)
                let mon = format(day, 'MMM')
                let weekday = format(day, 'EEE')
                
                let todayD = getDate(currMonth)
                let todayM = getMonth(currMonth)
                let todayY = getYear(currMonth)
                let yesterday = subDays(currMonth, 1)

                let isToday = (d === todayD & m === todayM & y === todayY ) ? true : false
                let dayIsNotInCurrentMonth = (day < monthStart & day >= startDate) | (day > monthEnd & day <= endDate) ? true : false 

                let dayGreaterThanToday = (day >= yesterday ) ? true : false 
                cells.push(
                    <CalendarDayCell key={d-m-y} d={d} m={m} y={y} mon={mon} weekday={weekday} dayGreaterThanToday ={dayGreaterThanToday} dayIsNotInCurrentMonth={dayIsNotInCurrentMonth} isToday={isToday} day={day} />
                )
                day = addDays(day ,1)
            }
            rows.push(
                <Grid key={day} container justify="space-evenly" alignItems="center" >
                    {cells}
                </Grid>
            )
            cells=[]
        }

        return (
        <div>{rows}</div>
        )
    }

    render() {
 
        return (
            <div>
                {/* render weekdays */}
                {this.showDays()} 

                {/* render days in a month */}
                {this.showCells()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  data : state.data,
  ui : state.ui
})

export default connect(mapStateToProps )(withStyles(styles)(CalendarCellFrame))
