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
   text: {
   marginBottom: 16,
   marginLeft : 20,
   fontSize: 18,
  },
  textDiv : {
    flex:0.7
  },
  flexContainer : {
    display : 'flex',
    flexDirection : 'row'
  }
};


function SimpleMediaCard(props) {
  const { classes, text } = props;
  return (
    <div>
      <Card className={classes.card} style={ text.screenShot ?  {height: '200px'} : {height:'60px'} }>
      <div className={classes.textDiv}>
        <CardContent  className={classes.flexContainer}>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.mainHead}
          </Typography>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.partNumber}
          </Typography>
          <Typography variant="subheading" className={classes.text} style={{marginRight: '100px'}}>
            {text.partName}
          </Typography>
          <Typography variant="subheading" className={classes.text} style={{marginRight: '100px'}}>
            {text.quantityRequired}
          </Typography>
        </CardContent>
      </div>
      <div style={{flex:0.3}}>
        <img src={text.screenShot} style={{height:'200px'}}/>
      </div>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(SimpleMediaCard)
