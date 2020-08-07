import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
    ...theme.spread,
})

class welcome extends Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={2} className={classes.gridMain} >
                welcome
            </Grid>          
        )
    }
}

export default withStyles(styles)(welcome)
