import { makeStyles } from '@mui/styles';


export default makeStyles((theme) =>({
 
    appBar: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        margin: '30px 0',
        alignItems: 'center',
        flexWrap: 'no-wrap',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '30px',
        width: '5rem',
        objectFit: 'cover',
      
      },

      [theme.breakpoints.down('sm')] :{
        mainContent: {
          flexDirection: 'column-reverse',
        }
      }
     
}))