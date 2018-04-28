import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import PurchaseOrder from '../components/PurchaseOrder.js';
import CreatePurchase from '../components/CreatePurchase.js';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const classes = {

  card: {
    minWidth: 100,
    display: 'flex',
    flexDirection: 'row'
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
    flexDirection : 'row',
    height: '60px'
  }
};



class SimpleExpansionPanel extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      purchaseItems : {}
    }
  }

  onPurchaseClick = (item) => {
    console.log(item)
    this.setState({
      purchaseItems:item
    })
  }

  render() {

  const { classes, text } = this.props;
  const { purchaseItems } = this.state;
  if(!text)
  return null;
  console.log(this.state)


  let expansionItemsArray = []

  text.items.map((item) => {

    expansionItemsArray.push(
      <div className='expCards'>
      <Card className={classes.card}>
      <div className={classes.textDiv}>
        <CardContent  className={classes.flexContainer}>
          <Typography variant="subheading" className={classes.text} >
          <strong>Main Head : </strong>{item.mainHead}
          </Typography>
          <Typography variant="subheading" className={classes.text} >
          <strong>Part Name : </strong>{item.partName}
          </Typography>
          <Typography variant="subheading" className={classes.text} >
          <strong>Part Number : </strong>{item.partNumber}
          </Typography>
          <Typography variant="subheading" className={classes.text} >
          <strong>Quantity Required : </strong>{item.quantityRequired}
          </Typography>
          <Typography variant="subheading" className={classes.text} >
          <strong>Quantity Stores : </strong>{item.quantityStores}
          </Typography>
        </CardContent>

        <img src={require('../background.jpg')} style={{height:'200px'}}/>
        </div>
      </Card>
      <Button variant="raised"  color="primary" onClick={this.onPurchaseClick.bind(this,item)}>
      Purchase
      </Button>
      </div>
    )
  })


  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{text.header}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        {expansionItemsArray}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
}
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
