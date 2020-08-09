import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import format from "date-fns/format"

import BookAppointment from './BookAppointment'

import {setSelectedDate} from '../redux/actions/dataActions'

import {connect} from 'react-redux'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
  },
  day : {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin : '3px',
  },
  dayDiv : {
    marginLeft : '10px',
    marginTop : '5px',
    float :'left'
  },
  weekday : {
    width: theme.spacing(12),
    height: theme.spacing(3),
    margin : '7px 7px 0px 7px',
    color : 'white',
    display: 'flex',
    justifyContent:'center',
    backgroundColor : '#bf360c',
    textTransform : 'uppercase',
  },
  dayTopFrame : {
    display: 'flex',
    flexDirection : 'row'
  }
})

export class CalendarDayCell extends Component {
    state = {
      isHovering : false
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

    handleSelectedDate = (selectedDate) => {
      this.props.setSelectedDate(selectedDate)
    }

    render() {
        const {classes, d,m,y,dayGreaterThanToday,dayIsNotInCurrentMonth,isToday,day} = this.props
        const {dailyStockAndRequests} = this.props.data
        let dailyStockAndRequestsFiltered = dailyStockAndRequests.filter( (dsr) => {
            return this.props.data.selectedCenter._id === dsr.vaccineCenterId
        })

        return (
            <Fragment>
                 
                <Grid itemkey={y-m-d} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseNoHover}>
                    <Paper elevation={3} className={classes.day} onClick={() => this.handleSelectedDate(day)}
                    style={{backgroundColor : dayIsNotInCurrentMonth ? '#f7f7f7' : 'white'}}>
                        <div className={classes.dayTopFrame} > 
                            <div className={classes.dayDiv} style={{color : isToday & !dayIsNotInCurrentMonth ? 'white': dayIsNotInCurrentMonth ? '#e0e0e0' : 'black' }}>
                                <div style={{backgroundColor: isToday & !dayIsNotInCurrentMonth ? '#484848' : '', borderRadius: isToday & !dayIsNotInCurrentMonth ? '50%' : '', padding : '0px 3px'}}>
                                    <b>
                                        {format(day, 'd')}
                                    </b>
                                </div>
                                <div className={classes.makeRequest} >
                                  {this.state.isHovering & dayGreaterThanToday & !dayIsNotInCurrentMonth ? <BookAppointment day={day} /> : ''}
                                </div>
                            </div>
                            <div>
                            {
                              dailyStockAndRequestsFiltered.map(({ date, stock, requests}) => {
                                let dt_ = date.split("T")
                                let dt__ = dt_[0]
                                let dtFinal = dt__.split("-")
                                let yr = Number(dtFinal[0])
                                let mn = Number(dtFinal[1])
                                let dt = Number(dtFinal[2])

                                return <div>{dt === d & mn === m+1 & yr === y ? stock+" "+requests : ''} </div>
                              }) 
                            }
                            </div>
                        </div>
                    </Paper>    
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  data : state.data
})

export default connect(mapStateToProps, {setSelectedDate} )(withStyles(styles)(CalendarDayCell))
