import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import MuiLink from '@material-ui/core/Link'
import ScheduleIcon from '@material-ui/icons/Schedule'
import InputBase from '@material-ui/core/InputBase'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import axios from 'axios'

import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'
import store from '../redux/store'
import {EDIT_USER_DETAILS} from '../redux/types'

const styles = (theme) => ({
    ...theme.spread,
    root: {
      flexGrow: 1,
    },
    arrow : {
      fontSize : '40px',
      color : '#ff5436'
    },
    username : {
      fontSize : '16px',
      fontWeight : '500',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    posted : {
      fontSize : '11px',
      fontWeight : '500',
      color : '#8d8c8c',
    },
  
})

export class AddUserDetails extends Component {

  state = {
    editUsername : false,
    editLocation : false,
    firstName : this.props.user.authenticatedUser.firstName,
    lastName : this.props.user.authenticatedUser.lastName,
    profilePicture : this.props.user.authenticatedUser.profilePicture,
    email : this.props.user.authenticatedUser.email,
    username : this.props.user.authenticatedUser.username,
    location : '',
    dob : '',
    panNumber : ''
  } 

  handleEditUsername = () => {
    this.setState({
        editUsername : true
    })
  }

  handleEditLocation = () => {
    this.setState({
      editLocation : true
    })
  }

  handleNoEditUsername = () => {
    this.setState({
      editUsername : false
    })
  }

  handleNoEditLocation = () => {
    this.setState({
      editLocation : false
    })
  }

//   handleSubmitUserDetails = (event) => {
//     event.preventDefault()
//     const newQuestion = {questionTitle : this.state.questionTitle}
//     this.props.updateQuestionTitle(this.props.question._id, newQuestion)
    
//     this.handleNoEditTitle()
//   }

    handleChange = (event) =>{
        this.setState({
        [event.target.name] : event.target.value 
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const userDetails = {
            _id : this.props.user.authenticatedUser._id,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            profilePicture : this.state.profilePicture,
            email : this.state.email,
            location : this.state.location,
            username : this.state.username
        }

        let userLoc = {
            "location": this.state.location,
            "options": {
            "thumbMaps": false
            }
        }

        axios.post(`http://www.mapquestapi.com/geocoding/v1/address?key=BHKWIylzKtkshRbp8hzzUU5L1bP7H3W3`, userLoc)
            .then(res => {
                let latlong = res.data.results[0].locations[0].displayLatLng
                userDetails.lat = latlong.lat
                userDetails.lng = latlong.lng

                axios.post('http://127.0.0.1:5000/editUserDetails' , userDetails)
                .then(res => {
                    store.dispatch({
                        type : EDIT_USER_DETAILS,
                        payload : userDetails
                    })
                })
                
            })
            .catch(err => console.log(err) )

        console.log(userDetails)
        


        //edit user details
        // this.props.editUserDetails()
  }

  render() {
    const { classes } = this.props
    return (
        <Grid item xs={12} sm container>
            <Grid item xs={11} container direction="column" spacing={2}>

            <form onSubmit={this.handleSubmit} >

                <TextField name="firstName" id="firstName" label="First Name" type="text" onChange={this.handleChange}
                    style={{marginBottom: '10px'}} value={this.state.firstName} variant="outlined" fullWidth />

                <TextField name="lastName" id="lastName" label="Last Name" type="text" onChange={this.handleChange}
                    style={{marginBottom: '10px'}} value={this.state.lastName} variant="outlined" fullWidth />
                
                <TextField name="username" id="username" label="Username" type="text" onChange={this.handleChange} 
                    style={{marginBottom: '10px'}} value={this.state.username} variant="outlined" fullWidth />

                <TextField name="location" id="location" label="Location" type="text" onChange={this.handleChange} 
                    style={{marginBottom: '10px'}} value={this.state.location} variant="outlined" fullWidth />

                <Button type="submit" variant="contained" color="secondary" 
                    style={{fontFamily: 'Poppins', margin : '10px 5px', fontSize : '16px', color : 'white'}}>        
                    Submit
                </Button>

            </form>


                {/* {this.state.editUsername ? 
                    <Fragment>
                        <InputBase
                        id="username"
                        name="username"
                        multiline
                        className={classes.postQ}
                        value={this.state.username}
                        inputProps={{ 'aria-label': 'Edit username' }}
                        onChange={this.handleChange}
                        fullWidth
                        /> 
                        <IconButton>
                            <CheckBoxIcon color="secondary" onClick={this.handlePostBody} />
                        </IconButton>
                        <IconButton>
                            <ClearIcon color="secondary" onClick={this.handleNoEditUsername}/>
                        </IconButton>
                    </Fragment> :
                    <Typography variant="body2" color="textSecondary" className={classes.qbody} onDoubleClick={this.handleEditUsername}>
                        {this.state.username}
                    </Typography>
                } 
                <Typography variant="body2" color="textSecondary" className={classes.qbody} onDoubleClick={this.handleEditUsername}>
                    {this.state.firstName}
                </Typography> */}
            </Grid>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps , {editUserDetails})(withStyles(styles)(AddUserDetails))
