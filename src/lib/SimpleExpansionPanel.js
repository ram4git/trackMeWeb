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
    backgroundColor : '#d1efd1'
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
    this.state = {
      selectedForPurchase : 0
    }
  }

  componentDidMount() {
    let sel = 0;
    this.props.text.items.map((item) => {
      if(item.selectedForPurchase){
        sel++;
      }
    });
    this.setState({
      selectedForPurchase : sel
    })
  }

  onPurchaseSelect = (indentID, partNumber) => {
    const {selectedForPurchase} = this.state;
    this.setState ({
      selectedForPurchase : selectedForPurchase + 1
    })
    let purchaseObj = {};
    purchaseObj['indentID']=indentID;
    purchaseObj['partNumber']=partNumber;
    this.props.onIndentItemSelectedForPurchase(purchaseObj);
  }


  render() {

  const { classes, text } = this.props;
  const {selectedForPurchase} = this.state;

  if(!text)
  return null;


  let expansionItemsArray = [] ;     const indentID = text.header;
  let count = 0;
  text.items.map((item, index) => {
    let mediaCardProps = {
      text : {
        indentID ,
        mainHead : item.mainHead,
        partName : item.partName,
        partNumber : item.partNumber,
        quantityRequired: item.quantityPurchase,
        screenShot : item.referenceImage,
        selectedForPurchase : item.selectedForPurchase
      },
      onPurchaseSelect : this.onPurchaseSelect,
      onPurchaseRemoval : this.onPurchaseRemoval
    }
    count +=1;
    expansionItemsArray.push(
      <div key={index} style={{marginTop: '5px', marginBottom : '5px'}}>
      <PurchaseItemCard  {...mediaCardProps} />
      </div>
    )
  })

  const iStyle = {margin:'15px',marginLeft:'100px'}

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} style={{width:'25%',fontSize : '16px'}}>{text.header}</Typography>
          <Typography className={classes.heading} style={iStyle}>Total = <span style={{color:'blue',fontSize:'25px'}}>{text.numOfItems}</span></Typography>
          <Typography className={classes.heading} style={iStyle}>Purchased = <span style={{color:'green',fontSize:'25px'}}>{selectedForPurchase}</span></Typography>
          <Typography className={classes.heading} style={iStyle}>Pending = <span style={{color:'red',fontSize:'25px'}}>{text.numOfItems - selectedForPurchase}</span></Typography>
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
