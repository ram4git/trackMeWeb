import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import PurchaseOrder from '../components/PurchaseOrder.js';
import CreatePurchase from '../components/CreatePurchase.js';
import PurchaseItemCard from '../lib/PurchaseItemCard.js';
import AddIcon from '@material-ui/icons/Add';





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
   display: 'flex',
   flex:1,
   flexDirection : 'row',
   marginLeft : '5%'
  },
  details: {
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'spaceBetween'
  },
   text: {

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
  }

  onPurchaseSelect = (indentID, partNumber) => {
    let purchaseObj = {};
    purchaseObj['indentID']=indentID;
    purchaseObj['partNumber']=partNumber;
    this.props.onIndentItemSelectedForPurchase(purchaseObj);
  }


  render() {

  const { classes, text } = this.props;
  if(!text)
  return null;


  let expansionItemsArray = [] ;     const indentID = text.header;

  text.items.map((item, index) => {
    let mediaCardProps = {
      text : {
        indentID ,
        mainHead : item.mainHead,
        partName : item.partName,
        partNumber : item.partNumber,
        quantityRequired: item.quantityRequired,
        screenShot : item.screenShot
      },
      onPurchaseSelect : this.onPurchaseSelect,
      onPurchaseRemoval : this.onPurchaseRemoval,
      addingPurchase : true

    }
    expansionItemsArray.push(
      <div key={index}>
      <PurchaseItemCard {...mediaCardProps} />
      </div>
    )
  })


  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{text.header}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display:'contents'}}>
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
