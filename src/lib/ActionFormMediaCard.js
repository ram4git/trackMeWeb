import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import LockOpen from '@material-ui/icons/LockOpen';
import Locked from '@material-ui/icons/Lock';


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





class ActionFormMediaCard extends React.Component {
  state = { quantityApproved: '', quantityPurchase : '' };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount () {
    const { mainHead, partNumber, quantityStores, quantityRequired  } = this.props.item;
    this.setState({
      mainHead ,
      partNumber,
      quantityStores,
      quantityRequired
    })

  }

  wantsToLock = () => {
    let itemProps = {
      mainHead: this.state.mainHead,
      partNumber: this.state.partNumber,
      quantityRequired : this.state.quantityRequired,
      quantityStores : this.state.quantityStores,
      quantityPurchase : this.state.quantityPurchase,
      quantityApproved : this.state.quantityApproved
    }
    this.setState({
      isLocked : true
    }, this.props.onItemLocked(itemProps))
  }

  wantsToUnLock = () => {
    this.setState({
      isLocked : false
    })
  }


 render(){

  const { classes, item } = this.props;
  const {isLocked} = this.state;
  return (
    <div>
      <Card className={classes.card}>
      <div className={classes.textDiv}>
        <CardContent>
          <Typography variant="headline" className={classes.text}>  {item.mainHead}</Typography>
          <Typography variant="headline" className={classes.text}>  {item.partNumber}</Typography>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            {item.quantityStores}
          </Typography>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            {item.quantityRequired}
          </Typography>
          <div style = { isLocked ? {display:'none'} : {}}>
          <TextField id="quantityApproved"
             label="Quantity Approved"
             value={this.state.quantityApproved}
             onChange={this.handleChange('quantityApproved')}
             margin="normal"
          />
          <TextField id="quantityPurchase"
             label="Quantity Purchase"
             value={this.state.quantityPurchase}
             onChange={this.handleChange('quantityPurchase')}
             margin="normal"
          />
          </div>
          <div style = { !isLocked ? {display:'none'} : {}}>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            Approved Qty = {this.state.quantityApproved}
          </Typography>
          <Typography variant="subheading" className={classes.text} color="textSecondary">
            Purchase Qty = {this.state.quantityPurchase}
          </Typography>
          </div>

          <Button variant="fab" color="secondary" aria-label="DONE" style = { !isLocked ? {display:'none'} : {} }
            onClick={this.wantsToUnLock}>
            <Locked/>
          </Button>
          <Button variant="fab" color="primary" aria-label="DONE" style = { isLocked ? {display:'none'} : {} }
                onClick={this.wantsToLock}>
            <LockOpen/>
          </Button>
        </CardContent>

      </div>
      <div className={classes.card}>

        <CardMedia
         className={classes.cover}
         image={require('../background.jpg')}
         title="Live from space album cover"
        />
        <CardMedia
         className={classes.cover}
         image={item.screenShot}
         title="Live from space album cover"
        />

        </div>

      </Card>
    </div>
  );
}
}

ActionFormMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(ActionFormMediaCard)
