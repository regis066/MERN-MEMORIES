import React, {useState} from 'react';
import { Avatar, Typography, Paper, Grid, Button, Container, TextField } from '@mui/material';
import useStyles from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';

const Auth = () => {
    const classes = useStyles();
    const isSignUp = false;


    const [showPassword , setShowPassword] = useState(false);
    const handleSubmit = () =>{

    }
    const handleChange = () =>{

    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )
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
            <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}/> 
            </Grid>

            <Button type='submit' variant='contained' fullWidth color='primary' className={classes.submit} >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
        </Paper>
   </Container>
  )
}

export default Auth
