import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Tooltip from '@material-ui/core/Tooltip'

// import img from '../assets/pan.jpg'
import ImageUploader from 'react-images-upload'

import axios from 'axios'

import OCR from './OCR'

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
        age : '',
        panNumber : '',
        pictures: '',
        occupation : '',
        disease : ''
    } 
    
    onDrop = (picture) => {
        this.setState({
            pictures: picture
        })
    }

    handleEditLocation = () => {
        this.setState({
        editLocation : true
        })
    }

    handleNoEditLocation = () => {
        this.setState({
        editLocation : false
        })
    }

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
    }

    render() {
        const { classes } = this.props
        return (
            <Grid item xs={12} sm container  spacing={2}>
                <Grid item xs={11} container style={{fontSize: '16px'}}>
                    <div><b> Please provide additional information to complete your application </b>
                        <Tooltip title={"People from age groups(<18 and 50+), essential service workers and those suffering from any pre-diagnosed disease would be given a higher priority than the healthy individuals"}  placement="top"><HelpOutlineIcon style={{fontSize : '15px', color : '#424242'}} /></Tooltip>
                    </div>
                </Grid>

                <Grid item xs={11} container direction="row" spacing={2}>
                
                    {/* age group */}
                    <Grid container item direction="row"  style={{border : '1px solid black'}} >
                        <Grid item xs={5} >
                            <Typography>
                                Enter your age
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField name="age" id="age" type="text" onChange={this.handleChange} 
                            value={this.state.age} variant="outlined" fullWidth />
                        </Grid>
                    </Grid>

                    {/* disease */}
                    <Grid container item direction="row"  style={{border : '1px solid black'}} >
                        <Grid item xs={5}>
                            <Typography>
                                Are you suffering from any disease
                            </Typography>
                        </Grid>
                        <Grid item xs={7} >
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel ></InputLabel>
                                <Select
                                value={this.state.disease}
                                onChange={this.handleChange}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* occupation */}
                    <Grid container item direction="row"  style={{border : '1px solid black'}} >
                        <Grid item xs={5} >
                            <Typography>
                                Enter your occupation
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel ></InputLabel>
                                <Select
                                id="occupation"
                                name="occupation"
                                value={this.state.occupation}
                                onChange={this.handleChange}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Essential"}>Essential Service Worker</MenuItem>
                                <MenuItem value={"Blue collar worker"}>Blue collar worker</MenuItem>
                                <MenuItem value={"Self"}>Business</MenuItem>
                                <MenuItem value={"Full"}>Employed full-time</MenuItem>
                                <MenuItem value={"Full-remote"}>Employed full-time (Remote)</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* location */}
                    <Grid container item direction="row"  style={{border : '1px solid black'}} >
                        <Grid item xs={5} >
                            <Typography>
                                Enter your location
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField name="location" id="location" type="text" onChange={this.handleChange} 
                            value={this.state.location} variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    
                    Upload your identity proof
                    <ImageUploader
                        // withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    <OCR />
                    
                
                    <Button type="submit" variant="contained" color="secondary" 
                        style={{fontFamily: 'Poppins', margin : '10px 5px', fontSize : '16px', color : 'white'}}>        
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps , {editUserDetails})(withStyles(styles)(AddUserDetails))
