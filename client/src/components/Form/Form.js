import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';

import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost } from '../../actions/postActions';
import { updatePost } from '../../actions/postActions';

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
       title: '', message: '', tags: '', selectedFile: ''
  });

  const post = useSelector((state) => currentId ?  state.posts.find((p) => p._id === currentId) : null)
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(()=> {
      if(post){
            setPostData(post)
      }
  }, [post])

  const handleSubmit = (e)=> {
            e.preventDefault();

            
            if(currentId){
                  dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));

            } else{

                  dispatch(createPost({...postData, name: user?.result?.name }));
            }

            clear()
  }

  const clear = () =>{
      setCurrentId(null);
      setPostData({
             title: '', message: '', tags: '', selectedFile: ''
          })
  }


  if(!user.result.name){
      <Paper className={classes.paper}>
            <Typography variant='h6' align='center'>Please Sign in to create your own memories and like other memories</Typography>
      </Paper>
  }
  return (
  <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant='h6'>{currentId ? 'Updating' : 'Creating'} a Memory</Typography>
      <TextField
            name='title' 
            variant='outlined' 
            label='Title' 
            fullWidth 
            value={postData.title}
            onChange={(e) => setPostData({...postData , title: e.target.value})}
      />
      <TextField
            name='message' 
            variant='outlined' 
            label='Message' 
            multiline
            rows={4}
            fullWidth 
            value={postData.message}
            onChange={(e) => setPostData({...postData , message: e.target.value})}
      />
      <TextField
            name='tags' 
            variant='outlined' 
            label='Tags' 
            fullWidth 
            value={postData.tags}
            onChange={(e) => setPostData({...postData , tags: e.target.value.split(',')})}
      />

      <div className={classes.fileInput}>
              <FileBase 
              type="file"
              multiple={false}
              onDone={({base64})=>setPostData({...postData, selectedFile: base64})}
              />
      </div>
      <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
      <Button variant='contained' size='small' onClick={clear} type='submit' color='secondary' fullWidth>Clear</Button>
      </form>
  </Paper>
  )
}

export default Form
