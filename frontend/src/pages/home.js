import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    mainDiv : {
        display: 'flex', 
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center'
      }
})

class home extends Component {

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={5} style={{border: '1px solid black'}}>
                <Grid item sm={4} className ={classes.sideBar} style={{border: '1px solid black'}}>
                    map
                </Grid>
                <Grid item sm={8} className ={classes.sideBar} style={{border: '1px solid black'}}>
                    <div className={classes.mainDiv}>
                        home
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default  connect(mapStateToProps, {})(withStyles(styles)(home))
