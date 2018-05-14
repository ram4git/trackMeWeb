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
   fontWeight : '500'
  },
  textDiv : {
    flex:0.8
  },
  flexContainer : {
    display : 'flex',
    flexDirection : 'row',
    height:'60px'
  }
};


function SimpleMediaCard(props) {
  const { classes, text } = props;
  return (
    <div>
      <Card className={classes.card} style={ text.screenShot ?  {height: '200px'} : {height:'60px'} }>
      <div className={classes.textDiv}>
        <CardContent  className={classes.flexContainer}>
          <Typography variant="headline" className={classes.text} style={{color : 'rgba(0, 0, 0, 0.54)'}}>
            Main Head :
          </Typography>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.mainHead}
          </Typography>
          <Typography variant="headline" className={classes.text} style={{color : 'rgba(0, 0, 0, 0.54)'}}>
            Part Name :
          </Typography>
          <Typography variant="subheading" className={classes.text} style={{marginRight: '100px'}}>
            {text.partName}
          </Typography>
          <Typography variant="headline" className={classes.text} style={{color : 'rgba(0, 0, 0, 0.54)'}}>
            Part Number :
          </Typography>
          <Typography variant="headline" className={classes.text} style={{marginRight: '100px'}}>
          {text.partNumber}
          </Typography>
          <Typography variant="headline" className={classes.text} style={{color : 'rgba(0, 0, 0, 0.54)'}}>
            Quantity Required :
          </Typography>
          <Typography variant="subheading" className={classes.text} style={{marginRight: '100px'}}>
            {text.quantityRequired}
          </Typography>

        </CardContent>
      </div>
      <div style={{flex:0.2}}>
        <Button variant="raised" color="primary" style={{float:'right',marginTop : '10px', marginRight:'100px'}} onClick={() =>
            window.location.href='/purchase/'+ text.purchaseID}>
          View Purchase <span style={{fontSize:'8px', marginLeft: '5px'}}>{ text.purchaseID }</span>
        </Button>
      </div>
      </Card>
    </div>
  );


}


SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(SimpleMediaCard)
