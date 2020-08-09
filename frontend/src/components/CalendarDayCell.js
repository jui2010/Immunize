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
    width: theme.spacing(11),
    height: theme.spacing(11),
    border : '0.1px solid #dedce0'
  },
  dayDiv : {
    float :'left'
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
                    <div className={classes.day} onClick={() => this.handleSelectedDate(day)}
                    style={{backgroundColor : dayIsNotInCurrentMonth ? '#f7f7f7' : 'white'}}>
                        <div className={classes.dayTopFrame} > 
                            <div className={classes.dayDiv} style={{color : isToday & !dayIsNotInCurrentMonth ? 'white': dayIsNotInCurrentMonth ? '#e0e0e0' : 'black' }}>
                                <div style={{backgroundColor: isToday & !dayIsNotInCurrentMonth ? '#484848' : '', borderRadius: isToday & !dayIsNotInCurrentMonth ? '50%' : '', padding : '0px 3px' }}>
                                    <b>
                                        {format(day, 'd')}
                                    </b>
                                </div>
                               
                            </div>
                            <br/>
                            <div className={classes.makeRequest} >
                                  {this.state.isHovering & dayGreaterThanToday & !dayIsNotInCurrentMonth ? <BookAppointment day={day} /> : ''}
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

                                return dt === d & mn === m+1 & yr === y ? 
                                  <div style={{marginTop : '30px'}}>
                                    <div style={{color : 'white', backgroundColor: '#e03e72', padding: '2px'}}>
                                      {stock} S
                                    </div>
                                    <div style={{color : 'white', backgroundColor: '#0013ad', padding: '2px'}}>
                                      {requests} R</div>
                                  </div> : ''
                              }) 
                            }
                            </div>
                        </div>
                    </div>    
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  data : state.data
})

export default connect(mapStateToProps, {setSelectedDate} )(withStyles(styles)(CalendarDayCell))
