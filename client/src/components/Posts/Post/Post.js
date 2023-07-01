import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/postActions';
// import { getPosts } from '../../../actions/postActions';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
    const classes = useStyles() 
    // getPosts();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} /> 
      <div className={classes.overlay}>
      <Typography variant='h6'>{post.creator}</Typography>
      <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      
      <div className={classes.overlay2}>
      <Button style={{color: 'white'}} 
        size='small' 
        onClick={()=> setCurrentId(post._id)}>
      <MoreHorizIcon fontSize='medium'/>
      </Button>
      </div>

      <div className={classes.details}>
      <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom>{post.title}</Typography>
      <CardContent>
      <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
      <Button size='small' color='primary' onClick={ () => dispatch(likePost(post._id))}>
      <ThumbUpAltIcon fontSize='small'/>
      &nbsp; Like &nbsp; 
      {post.likeCount}
      </Button>
      <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}>
      <DeleteForeverIcon fontSize='small'/>
      &nbsp; Delete
      </Button>
     
      </CardActions>
      </Card>
  )
}

export default Post
