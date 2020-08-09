import React from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/immunize_logo.gif'

import { useAuth0 } from "@auth0/auth0-react"

import store from '../redux/store'
import { SET_AUTHENTICATED, SET_AUTHENTICATED_USER } from '../redux/types'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    login: {
        // flex : 1,
        // alignItems : 'right',
        fontSize : '20px',
        marginRight : '10px'
    },
    profile : {
        borderRadius : '5px'
    }
})


const NavBar = (props) => {

    const { classes } = props

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        // logout 
    } = useAuth0();

    // const logoutWithRedirect = () =>
    //   logout({
    //     returnTo: window.location.origin,
    //   });

    if(isAuthenticated){
        store.dispatch({type : SET_AUTHENTICATED})

        let userDetails = {
           firstName : user.given_name,
           lastName : user.family_name,
           profilePicture : user.picture,
           email : user.email,
           username : user.nickname
        }

        axios.post('http://127.0.0.1:5000/addUser' , userDetails)
            .then(res => {
                console.log(res)
            })

        axios.post('http://127.0.0.1:5000/getAuthenticatedUser' , userDetails)
            .then(res => {
                store.dispatch({
                    type : SET_AUTHENTICATED_USER,
                    payload : res.data
                })
            })   
    }

    return (
        <div >
            <AppBar position="relative" color="transparent" style={{marginBottom: '10px'}}>
                <Toolbar style={{ height: 50}}>

                    <img src={logo} alt="Profile" width="130" height="50" />

                    {!isAuthenticated && (
                        <Button className={classes.login} color="primary" onClick={() => loginWithRedirect()}>
                            Login
                        </Button>)}
                    
                    {!isAuthenticated && (
                        <Button className={classes.login} color="primary" onClick={() => loginWithRedirect()}>
                            Signup
                        </Button>)}

                    {isAuthenticated && ( 
                        <Button component = {Link} to="/profile">
                            <img src={user.picture} alt="Profile" width="50" classname={classes.profile} />
                        </Button>
                    )}

                    {isAuthenticated && ( 
                        <Button color="secondary" component = {Link} to="/home" >Home</Button>
                    )}
                        
                    {isAuthenticated && ( 
                        <Button color="secondary" component = {Link} to="/dashboard" >Dashboard</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default (withStyles(styles)(NavBar))
