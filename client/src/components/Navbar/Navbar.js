import React, {useState , useEffect} from 'react'
import { AppBar, Typography, Avatar, Toolbar, Button, Alert } from '@mui/material'
import useStyles from './styles'
import memories from '../../images/memories.jpg'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation }  from 'react-router-dom';
import decode from  'jwt-decode'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () =>{
        dispatch({ type: 'LOGOUT'});
        setUser(null);
        history.push('/auth');
    }
  
    useEffect (()=> {
      const token = user?.token;

      if(token){
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime) {
          logout();
          <Alert severity='info'>Token Expired, SignIn again...</Alert>
        }
      }

   setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
  return (
    <AppBar className= {classes.appBar} position='static' color='inherit'>

    <div className={classes.brandContainer}>
    <Typography className={classes.heading} variant='h2'>Memories</Typography>
    <img  component={Link} to='/' className={classes.image} src={memories} alt='' height='60'/>
    
    </div>

    <Toolbar className={classes.toolbar}>

    {user ? (
      <div className={classes.profile}>
      <Avatar className={classes.purple} alt= {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
      <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
      <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
      
      </div>
    ) : (
      <Button variant='contained' component={Link} to='/auth' color='primary'>Sign Up</Button>
    )}
     
    </Toolbar>
    </AppBar>

  )
}

export default Navbar
