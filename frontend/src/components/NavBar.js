import React from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import { useAuth0 } from "@auth0/auth0-react"

import store from '../redux/store'
import { SET_AUTHENTICATED } from '../redux/types'

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
  }

  return (
    <div >
        <AppBar position="static">
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
                    <img
                    src={user.picture}
                    alt="Profile"
                    width="50"
                    />
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
