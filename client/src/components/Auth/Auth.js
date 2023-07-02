import React, {useState} from 'react';
import { Avatar, Typography, Paper, Grid, Button, Container } from '@mui/material';
import useStyles from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login'
import Icon from './icon';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { signUp, signIn } from '../../actions/auth';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const initialSate = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

    const [isSignUp, setIsSignUp] = useState(true);
    const [formData , setFormData] = useState(initialSate);

    const [showPassword , setShowPassword] = useState(false);
    const handleSubmit = (e) =>{
            e.preventDefault();
            

            if(isSignUp){
                dispatch(signUp(formData, history))
            }else{
                dispatch(signIn(formData, history))
            }

    }
    const handleChange = (e) =>{
            setFormData({...formData , [e.target.name] : e.target.value})
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )

    const switchMode = () =>{
        setIsSignUp((prevSignUp) => !prevSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
           dispatch({ type: 'AUTH' , data: {result , token}}) ;
           history.push('/');
        } catch (error) {
            console.log(error);
        }


    }

    const googleFailure = ( ) =>{
            console.log('Google Sign In was unsuccessful . Try again Later');
    }
  return (
   <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            { isSignUp && (
                <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name'  handleChange={handleChange} half/>

                </>
            )}

            <Input name='email' label='Email Address' type='email' handleChange={handleChange}/>
            <Input name='password' label='Password' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange}/>

            {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}/>} 
            </Grid>

            
            <Button type='submit' variant='contained' fullWidth color='primary' className={classes.submit} >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            <GoogleLogin 
            clientId = '193694079262-h03986n44d08uajdr3bo2qe42su8dpgt.apps.googleusercontent.com'
            render = {( renderProps ) =>( 
                <Button className={classes.googleButton} variant='contained' color='primary' onClick={renderProps.onClick} disabled= {renderProps.disabled} fullWidth startIcon= {<Icon />}>Google Sign In</Button>
            )}
            
            onSuccess = {googleSuccess}
            onFailure = {googleFailure}
            cookiePolicy = 'single_host_origin'
            />
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={switchMode}>{isSignUp ? 'Already have an Account Sign Up' : "Don't have an account Sign In" }</Button>
                </Grid> 
            </Grid>
        </form>
        </Paper>
   </Container>
  )
}

export default Auth
