import React ,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Done from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Webcam from 'react-webcam';
import Videocam from '@material-ui/icons/Videocam';
import { uploadPurchaseImage, savePurchaseItems, updateItemsQuantity } from '../api/allApi.js';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';


const dialogStyles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class ViewPurchaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      webcamClicked: false,
      showLiveCameraFeed: true,
      itemButtonClicked: false
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onCameraClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({webcamClicked: true})
  }
  setRef(webcam) {
      this.webcam = webcam;
    }

  renderCamera() {
    return (
      <div>
        { this.renderImage() }
      </div>
    );
  }

  renderImage() {
     if(this.state.showLiveCameraFeed) {
       return (
         <Webcam
           audio={false}
           ref={this.setRef.bind(this)}
           height={350}
           width={400}
           screenshotFormat='image/jpeg'
           onClick={this.capture.bind(this)}
         />
       );
     }
     return (
         <img src={this.state.screenShot} style={{height:'340', margin:'20px'}} />
     );
   }

   capture() {
       if(this.state.showLiveCameraFeed) {
         const screenShot = this.webcam.getScreenshot();
         this.setState({
           screenShot,
           showLiveCameraFeed: false
         });
       } else {
         this.setState({
           showLiveCameraFeed: true
         });
       }
     }

     onActionButton = (partNumber, quantity, mainHead) => {
       this.setState({
         open : true,
         partNumber
       })

       updateItemsQuantity(mainHead, partNumber, quantity).then(() => {
         alert('successfully updated')
       }).catch((e) => console.log(e));
     }

     onSubmittingPurchase = (img) => {
       const { purchaseID, items } = this.props;
       const {partNumber} = this.state;
        let role = window.localStorage.role;
        let imgFile = img.replace(/^data:image\/\w+;base64,/, "");

       uploadPurchaseImage(imgFile, purchaseID, role, partNumber).then((snapshot) => {
         console.log(snapshot.downloadURL);
         alert('successfully uploaded');
       }).catch((e) => console.log(e))
       this.setState({
         open: false
       })
     }

     onPurchaseSubmitClick = () => {
       const { items, purchaseID } = this.props;

       const payload = {
         items,
         purchaseID,
         createdAt : new Date().toString(),
         currentOwner : 'STORE'
       }
         savePurchaseItems(payload).then(() => {
           alert('successfully saved');
         }).catch((e) => console.log(e))
  }



  render() {
  const { classes, items, purchaseID } = this.props;
  if(!items)
  return null;
  console.log(items)
  const { open, webcamClicked, screenShot } = this.state;
  let count = 0;
  return (
    <Fragment>
    <Paper className={classes.root}>

      <Table className={classes.table} style={{marginTop:'80px', marginLeft: '170px', width:'70%' }}>
        <TableHead>
          <TableRow>
          <CustomTableCell>S.NO</CustomTableCell>
            <CustomTableCell>MAIN HEAD</CustomTableCell>
            <CustomTableCell numeric>PART NAME</CustomTableCell>
            <CustomTableCell numeric>PART NUMBER</CustomTableCell>
            <CustomTableCell numeric>QUANTITY</CustomTableCell>
            <CustomTableCell>ACTION</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(items).map((item, index) => {
            let purchaseItem = items[item];
            console.log(purchaseItem)
            // count = count+1;
            // if(count == items.length)
            if(typeof purchaseItem == "object")

            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell>{index+1}</CustomTableCell>
                <CustomTableCell>{purchaseItem.mainHead}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partName}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partNumber}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.quantityRequired}</CustomTableCell>
                <CustomTableCell numeric>
                <Button
                onClick={this.onActionButton.bind(this, purchaseItem.partNumber, purchaseItem.quantityRequired, purchaseItem.mainHead)}>
                <Done />
                </Button>
                <Button>
                <CloseIcon/>
                </Button>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div style={{marginLeft:'500px', marginTop:'20px'}}>
      <Button variant='raised' color='secondary' onClick={this.onPurchaseSubmitClick}>
      SUBMIT
      </Button>
      </div>
    </Paper>
    <div style={{margin:'5%', width:'30%'}}>
    <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar>
            <Toolbar style={{float:'right'}}>
              <IconButton color="inherit"  aria-label="Close" onClick={this.handleClose} >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{marginLeft:'450px'}}>
          <div onClick={this.capture.bind(this)} style={{position:'relative', marginTop:'200px'}}>
            { !webcamClicked ?
              <Button variant="fab" color="primary"
                    onClick={this.onCameraClick}>
                <Videocam/>
              </Button> : this.renderCamera() }
          </div>
          <div style={{marginTop:'20px'}}>
          <TextField label="text field" />
          </div>
          <div style={{marginTop:'30px'}}>
          <Button variant='raised' color='primary' onClick={this.onSubmittingPurchase.bind(this, screenShot)}>
          DONE
          </Button>
          </div>
          </div>
        </Dialog>
        </div>
    </Fragment>
  );
}
}

ViewPurchaseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewPurchaseTable);
