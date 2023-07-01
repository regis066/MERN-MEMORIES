import React,{ useEffect } from 'react';
import { Container} from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { gapi } from 'gapi-script'
import Auth from './components/Auth/Auth';


const App = () => {

  useEffect(()=>{
    function start (){
      gapi.client.init({
        clientId: '193694079262-h03986n44d08uajdr3bo2qe42su8dpgt.apps.googleusercontent.com' , 
        scope: ''
      })
    };
    gapi.load('client:auth' , start);
  });
    
  return (
    <BrowserRouter>
          <Container maxWidth='lg'>
          <Navbar />
          <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/auth' exact component={Auth}/>
          
         
          </Switch>
   
        </Container>
    </BrowserRouter>
   
  )
}

export default App


//On extra small devices it will take the full width xs= {12}

