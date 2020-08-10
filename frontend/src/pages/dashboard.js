import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'

import CountUp from 'react-countup'
import Graph from '../components/Graph'
import PieChart from '../components/PieChart'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import MapDashboard from '../components/MapDashboard'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    cells : {
        borderRadius : '8px'
    },
    paper : {
        padding : '15px 20px',
        margin : '10px 30px',
        height : '80px'
    },
    graph : {
        padding : '15px 20px',
        margin : '10px'
    },
    map : {
        width : '700px', 
        height : '350px',
        marginBottom : '30px'
    },
    topCenters : {
        width : '250px', 
        height : '350px',
        marginBottom : '30px'
    },
    heading : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        textTransform : 'bold',
        fontWeight : '500'
    }
})

class dashboard extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={5} style={{border: '1px solid black'}}>
                <Grid item sm={3} container className ={classes.sideBar} direction="column" style={{border: '1px solid black'}}>
                    <Grid item className ={classes.cells} >
                    {/* Total Requests */}
                        <Paper elevation={3} className ={classes.paper}>
                            <Typography className={classes.heading}>Total Requests</Typography>
                            <CountUp
                                end={12050}
                            ></CountUp>
                        </Paper>
                    </Grid>

                    <Grid item className ={classes.cells} >
                    {/* Total Vaccines Distributed */}
                        <Paper elevation={3} className ={classes.paper}>
                            <Typography className={classes.heading}>Total Vaccines Distributed</Typography>
                            <CountUp
                                end={10110}
                            ></CountUp>
                        </Paper>
                    </Grid>

                    <Grid item className ={classes.cells} >
                    {/* Total Requests Pending Today */}
                        <Paper elevation={3} className ={classes.paper}>
                        <Typography className={classes.heading}>Total Requests Pending Today</Typography>
                            <CountUp
                                end={2735}
                            ></CountUp>
                        </Paper>
                    </Grid>

                    <Grid item className ={classes.cells} >
                    {/* Total Requests Pending< */}
                    <Paper elevation={3} className ={classes.paper}>
                            <Typography className={classes.heading}>Total Requests Pending</Typography>
                            <CountUp
                                end={1776}
                            ></CountUp>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item sm={9} container className ={classes.sideBar} direction="column" style={{border: '1px solid black'}}>
                    <Grid item container className ={classes.sideBar} direction="row" style={{border: '1px solid black'}}>
                        <Grid item style={{border: '1px solid black'}}>
                            <Paper elevation={3} className ={classes.graph}>
                                <Typography>Day-wise Demand vs Supply of Vaccines </Typography>
                                <Graph />
                            </Paper>
                        </Grid>
                        <Grid item style={{border: '1px solid black'}}>
                            <Paper elevation={3} className ={classes.graph}>
                                <Typography>Age-group wise vaccine disbursed</Typography>
                                <PieChart />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item container className ={classes.sideBar}  style={{border: '1px solid black'}}>
                          <Grid item style={{border: '1px solid black', marginBottom : '40px', width : "990px"}}>
                            <Paper elevation={3} >
                                <Typography>Top Centers</Typography>
                                <MapDashboard/>
                                <TextField name="loc" id="loc" type="text" onChange={this.handleChange} 
                             variant="outlined"  />
                            <Button type="submit" variant="contained" color="secondary" 
                                style={{fontFamily: 'Poppins', margin : '10px 5px', fontSize : '16px', color : 'white'}}>        
                                Add on map
                            </Button>
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {} )(withStyles(styles)(dashboard))
