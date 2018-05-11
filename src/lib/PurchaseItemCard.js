import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog from 'material-ui/Dialog';


const styles = {

  content : {
    display: 'flex',
    flexDirection: 'row',
  },
  actions: {
    flex:0.1
  },
  title: {
    fontSize:'18px',
    color: 'black' ,
    width:'200px'
  },
  pos: {
    marginBottom: 12,
  },
};

const flexContainer = {
  display : 'flex',
  flexDirection : 'row',
  height: '60px'
}

class PurchaseItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zoomInImage : false}
  }

  componentDidMount() {

  }

onItemSelectedForPurchase = partNumber => event => {
    this.props.onPurchaseSelect(this.props.text.indentID, partNumber)
}

onRemovalOfPurchaseItems = partNumber => event => {
  console.log(partNumber)
}

  showImage = image => event => {
    this.setState({
      zoomInImage : true,
      zoomInURL : image
    })
  }

  closeZoomInImage = () => {
    this.setState({
      zoomInImage : false
    })
  }

render() {
  const { classes, text } = this.props;

  const selectedForPurchase= text.selectedForPurchase || false;
  const itemInPurchase= text.itemInPurchase || false;


  const split = text.split; let indentSplitString = '';
  const {zoomInImage, zoomInURL} = this.state;

if(split) {
  Object.keys(split).forEach(indentID => {
      indentSplitString = indentSplitString + indentID + ' = ' + split[indentID] + '   ';
  })
}

  if(zoomInImage)
   return  <Dialog
      open={this.state.zoomInImage}
      onClose={this.closeZoomInImage}>
      <img src={zoomInURL} style={{}}/>
    </Dialog>


  return (
    <div style={ text.selectedForPurchase && !text.right ? {opacity : '0.6', filter : 'grayscale(1)', flex : '90%'}
                    : {flex : '90%'}  }>
      <Card>
        <CardContent className={classes.content}>

        <div style={{ width:'15%', display:'flex', flexDirection:'column'}}>
          <Typography>
            Main Head
          </Typography>
          <Typography>
            {text.mainHead}
          </Typography>
          <Typography style={{marginTop : '20px'}}>
            {indentSplitString}
          </Typography>
        </div>

        <div style={{ width:'25%', display:'flex', flexDirection:'column'}}>
            <Typography>
              Part Name
            </Typography>
            <Typography color="primary" >
              {text.partName}
            </Typography>
        </div>

        <div style={{ width:'15%', display:'flex', flexDirection:'column'}}>
          <Typography>
            Part Number
          </Typography>
          <Typography color="textSecondary" >
            {text.partNumber}
          </Typography>
        </div>

        <div style={{ width:'15%', display:'flex', flexDirection:'column'}}>
          <Typography>
            Quantity
          </Typography>
          <Typography color="textSecondary" >
            {text.quantityRequired}
          </Typography>
        </div>

        <div style={{height:'150px',borderRadius:'100px',width:'30%'}}>
        <img src={text.screenShot} style={{height:'150px',borderRadius:'100px'}}/>
        <Button onClick={this.showImage(text.screenShot)} style={{marginTop : '-15px', float : 'right'}} >
        <ZoomInIcon/>
        </Button>
        </div>
        {!selectedForPurchase &&  <Button variant="fab"  color="primary" aria-label="add" value={text.partNumber}
        onClick={this.onItemSelectedForPurchase(text.partNumber)}
          className={classes.button}>
         <AddIcon />
       </Button> }
       {itemInPurchase &&  <Button variant="fab"  color="primary" aria-label="add" value={text.partNumber}
       onClick={this.onItemSelectedForPurchase(text.partNumber)}
         className={classes.button}>
        <RemoveIcon />
      </Button> }
        </CardContent>
      </Card>
    </div>
  );
}




}

PurchaseItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PurchaseItemCard);
