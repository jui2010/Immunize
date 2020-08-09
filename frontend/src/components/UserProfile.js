import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import EmailIcon from '@material-ui/icons/Email'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    currMonth : {
      textAlign : 'center',
    },
    mainDiv : {
        width: theme.spacing(32),
    },
    imgDiv : {
        objectFit: 'cover',
        height: theme.spacing(32),
        width: theme.spacing(32),
    },
    editProfileDiv : {
        "&:hover":{
            background: "#e0e0e0"
        },
        border : 'solid 1px #e0e0e0',
        height: theme.spacing(3.1),
        display : 'flex',
        flexDirection : 'row'
    },
    nameDiv : {
        marginTop : '15px',
        fontSize : '25px',
        height: theme.spacing(3.5),
        display : 'flex',
        flexDirection : 'row',
        textTransform : 'capitalize',
        fontFamily: 'Bebas Neue',
        color : '#212121',
        letterSpacing  : '0.4px'
    },
    usernameDiv : {
        marginTop : '6px',
    },
    bioDiv : {
        marginTop : '18px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row'
    },
    locationDiv : {
        marginTop : '4px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row',
        textTransform : 'capitalize',
    },
    emailDiv : {
        marginTop : '4px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row'
    }
})

class UserProfile extends Component {

    render() {
        const {classes} = this.props
        const {firstName, lastName, email} = this.props.user.authenticatedUser

        return (
            <div className={classes.mainDiv}>

                <div className={classes.imgDiv}>
                    img{/* <img src={profileImage} alt="profilePicture" className={classes.imgDiv} onClick={this.handlePictureChange} /> */}
                </div>

                <div className={classes.editProfileDiv}>
                    {/* <EditUserDetails/> */}edit
                </div>

                <div className={classes.nameDiv}>
                    {firstName ? firstName : ''} {lastName ? lastName : ''}
                </div>

                {/* <div className={classes.usernameDiv}>
                    @{username}
                </div> */}
                
                <div className={classes.emailDiv} >
                    <EmailIcon style={{fontSize : '18px', color : '#616161', marginRight: '10px'}} /> {email}
                </div>
{/* 
                <div className={classes.locationDiv} >
                    <LocationOnIcon style={{fontSize : '18px', color : '#616161',  marginRight: '10px'}}/> {location}
                </div> */}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(UserProfile))
