import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import format from "date-fns/format"

import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

import {connect} from 'react-redux'
import {getPrevMonth, getNextMonth} from '../redux/actions/uiActions'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
    fontFamily: 'Bebas Neue',
    fontSize: '40px',
    color:'#9fa8da',
    letterSpacing: '1px'
  },
  mon : {
    fontSize: '30px',
    color:'#a058e8',
    letterSpacing: '6px',
    fontFamily: 'Bebas Neue'
  },
  yr : {
    fontSize: '15px',
    color: '#9575cd' 
  }
})

export class CalendarHeader extends Component {

  nextMonth = () => {
    this.props.getNextMonth()
  }

  prevMonth = () => {
    this.props.getPrevMonth()
  }

  render() {
    const {classes} = this.props
    let {currMonth} = this.props.ui

    return (
      <Grid container >

        {/* get previous month */}
        <Grid item xs ={1}>
          <IconButton  onClick={this.prevMonth} style={{position:'absolute', zIndex:1000, fontSize : '12px'}}>
            <ArrowBackIosIcon style={{ fontSize : '20px'}}/>
          </IconButton>
        </Grid>

        {/* format the month-year on CalendarHeader */}
        <Grid item xs ={9} className={classes.currMonth} >
          <div className={classes.mon}>
            {format(currMonth , 'MMMM')}  
            <sub className={classes.yr}>
              {format(currMonth , 'yyyy')}
            </sub>
          </div>
        </Grid>

        {/* get next month */}
        <Grid item xs ={1}>
          <IconButton onClick={this.nextMonth} style={{position:'absolute', zIndex:1000,margin:'auto 0px auto 57px'}} >
            <ArrowForwardIosIcon style={{ fontSize : '20px'}}/>
          </IconButton>
        </Grid>
    </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  ui : state.ui
})

const mapActionsToProps = {
  getPrevMonth,
  getNextMonth
}

export default connect(mapStateToProps , mapActionsToProps )(withStyles(styles)(CalendarHeader))
