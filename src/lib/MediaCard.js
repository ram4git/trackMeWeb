import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList from 'material-ui/GridList';

const classes = {

  card: {
   display: 'flex',
   flex:1
  },
  details: {
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'spaceBetween'
  },
  content: {
   flex: '1 0 auto',
  },
   cover: {
     width: 200,
     height: 200,
     flex:0.5,
     marginLeft : 20
   },
   text: {
   marginBottom: 16,
   marginLeft : 20,
   fontSize: 24,
  },
  textDiv : {
    flex:0.5
  }
};

function SimpleMediaCard(props) {
  const { classes, text } = props;
  return (
    <div>
      <Card className={classes.card}>
      <div className={classes.textDiv}>
        <CardContent>
          <Typography variant="headline" className={classes.text}>  {text.title}</Typography>
          <Typography variant="headline" className={classes.text}>  {text.title}</Typography>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            {text.number}
          </Typography>
        </CardContent>

      </div>
      <div className={classes.card}>

        <CardMedia
         className={classes.cover}
         image={text.screenShot}
         title="Live from space album cover"
        />
        <CardMedia
         className={classes.cover}
         image={require('../background.jpg')}
         title="Live from space album cover"
        />
        </div>

      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(SimpleMediaCard)
