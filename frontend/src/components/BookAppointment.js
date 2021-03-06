import React, { Component, Fragment } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import MyButton from './MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import {connect} from 'react-redux'
import {bookAppointment} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
})

class BookAppointment extends Component {
    state = {
        open : false,
    }

    handleOpen = () => {
        this.setState({
            open : true
        })
        if(Object.keys(this.props.user.authenticatedUser).length !== 0 &  this.props.data.selectedCenter !== ""){
            const details = {
                userId : this.props.user.authenticatedUser._id,
                vaccineCenter : this.props.data.selectedCenter._id,
                appointmentDate : this.props.day,
                createdAt : new Date()
            }
            this.props.bookAppointment(details)
        }
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    render() {
        return (
            <Fragment>
                <MyButton tip ={'Book appointment'} onClick={this.handleOpen}>
                    <AddCircleOutlineIcon style={{fontSize : '18px', color : '#a058e8'}}/>
                </MyButton>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle >
                        <div style={{fontFamily: 'Bebas Neue'}}>
                            {Object.keys(this.props.user.authenticatedUser).length === 0 ?
                            "Please login" :  this.props.data.selectedCenter === ""  ? "Please select a vaccine center" 
                            : "Appointment booked"}
                        </div>
                    </DialogTitle>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    user : state.user
})
export default connect(mapStateToProps, {bookAppointment})(withStyles(styles)(BookAppointment))
