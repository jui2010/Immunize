import React from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    title: {
        flexGrow: 1,
        color : 'white'
    },
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
            <AppBar position="static" style={{marginBottom: '30px'}}>
                <Toolbar>
                <Typography variant="h6" >
                    Immunize
                </Typography>
                    {!isAuthenticated && (
                        <Button
                        className={classes.title}
                        color="primary"
                        onClick={() => loginWithRedirect()}>
                            Login
                        </Button>)}

                    {isAuthenticated && ( 
                        <Button component = {Link} to="/profile">
                            <img
                            src={user.picture}
                            alt="Profile"
                            width="50"
                            />
                        </Button>
                    )}

                    {isAuthenticated && ( 
                    <Button color="secondary" component = {Link} to="/home" >home</Button>
                    )}
                        
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default (withStyles(styles)(NavBar))
