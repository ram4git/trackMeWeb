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
   flex:1,
   width:'47%',
   marginLeft : '5%'
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
   fontSize: 18,
  },
  textDiv : {
    flex:0.7
  }
};

const flexContainer = {
  display : 'flex',
  flexDirection : 'row',
  height: '200px'
}

function SimpleMediaCard(props) {
  const { classes, text } = props;
  return (
    <div>
      <Card className={classes.card}>
      <div className={classes.textDiv}>
        <CardContent style={flexContainer}>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.title}
          </Typography>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.name}
          </Typography>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            {text.number}
          </Typography>
        </CardContent>
      </div>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(SimpleMediaCard)
