import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import {connect} from 'react-redux'
import {getVaccineCenters, getAllDailyStockAndRequests} from '../redux/actions/dataActions'

import MapLayout from '../components/MapLayout'
import CalendarHeader from '../components/CalendarHeader'
import CalendarCellFrame from '../components/CalendarCellFrame'

const styles = (theme) => ({
    ...theme.spread,
    section : {
        padding : '20px'
    },
    mainDiv : {
        display: 'flex', 
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center'
      }
})

class home extends Component {

    componentDidMount(){
        this.props.getVaccineCenters()
        this.props.getAllDailyStockAndRequests()
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container style={{border: '1px solid black'}}>
                <Grid item sm={4} className ={classes.section} style={{border: '1px solid black'}}>
                    <MapLayout />
                </Grid>
                <Grid item sm={8} className ={classes.section} style={{border: '1px solid black'}}>
                    <div className={classes.mainDiv}>
                        <CalendarHeader />
                        <CalendarCellFrame />
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default  connect(mapStateToProps, {getVaccineCenters, getAllDailyStockAndRequests})(withStyles(styles)(home))
