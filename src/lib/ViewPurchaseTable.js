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
import { uploadPurchaseImage, savePurchaseItems, updateItemsQuantity, getAllItemsForIndentAndUpdate } from '../api/allApi.js';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';


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
      itemButtonClicked: false,
      renderSnackBar : false
    }
  }

  componentDidMount() {
    console.log('mmmm', this.props);
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
       if(window.localStorage.role === 'STORE') {
       updateItemsQuantity(mainHead, partNumber, quantity);
       alert('item quantity successfully updated in store');
        }else if(window.localStorage.role === 'SECURITY'){
         this.setState({
          open : true,
          showLiveCameraFeed : true,
           partNumber
        })

     }
     }

     onSubmittingPurchase = (img) => {
       const { purchaseID, items } = this.props;
       const {partNumber} = this.state;
        let role = window.localStorage.role;
        let imgFile = img.replace(/^data:image\/\w+;base64,/, "");

        let ref = this;
       uploadPurchaseImage(imgFile, purchaseID, role, partNumber).then((snapshot) => {
         console.log(snapshot.downloadURL);
         let item =  ref.props.items.parts[partNumber];
         item.screenShot = snapshot.downloadURL;
         const { items = {} } = ref.state ;
         alert('successfully uploaded');

         if(!items['parts'])
            items['parts']= {};

         items['parts'][partNumber] = item;
         ref.setState({
           items
         })

         this.setState({
           screenShot : null,
           webcamClicked : false
         })
       }).catch((e) => console.log(e))
       this.setState({
         open: false
       })
     }

     onPurchaseSubmitClick = () => {
       const {  purchaseID } = this.props;
       let { items  } = this.state;
       if(!items)
        items = this.props.items; let status= 'OPEN';

       items['companyName'] = this.props.items.companyName || '';
       if(this.props.items.currentOwner === 'SECURITY')
       items['currentOwner'] = 'STORE' ;
       else if(this.props.items.currentOwner === 'STORE'){
       items['currentOwner'] = 'STORE' ;
       status = 'CLOSED';
       }else if(this.props.items.currentOwner === 'PURCHASE'){
        items['currentOwner'] = 'SECURITY' ;
       }

       items['address'] = this.props.items.address || '';

       const payload = {
         items,
         purchaseID,
         createdAt : new Date().toString(),
         currentOwner : 'STORE',
         status
       }
       savePurchaseItems(payload).then(() => {
         alert('successfully saved');
         this.setState({
              renderSnackBar : true
           })
         }).catch((e) => console.log(e))

         getAllItemsForIndentAndUpdate(purchaseID, items.parts);

       }



  render() {
  const { classes, items, purchaseID } = this.props;

  if(!items)
  return null;
  console.log(items)
  const { open, webcamClicked, screenShot, renderSnackBar } = this.state;
  if(renderSnackBar) {
    return (<Snackbar
       anchorOrigin={{ vertical : 'top', horizontal:'right' }}
       open={renderSnackBar}
       onClose={this.handleCloseSnackBar}
       SnackbarContentProps={{
         'aria-describedby': 'message-id',
       }}
       message={<span id="message-id">Indent updated successfully</span>}
     />)
  }

  let count = 0; let itemParts = items.parts || {};
  return (
    <Fragment>
    <Paper className={classes.root}>

      <Table className={classes.table} style={{marginTop:'80px', width:'100%' }}>
        <TableHead>
          <TableRow>
          <CustomTableCell>S.NO</CustomTableCell>
            <CustomTableCell>MAIN HEAD</CustomTableCell>
            <CustomTableCell numeric>PART NAME</CustomTableCell>
            <CustomTableCell numeric>PART NUMBER</CustomTableCell>
            <CustomTableCell numeric>QUANTITY</CustomTableCell>
            <CustomTableCell>ACTION</CustomTableCell>
            <CustomTableCell>REFERENCE IMAGE</CustomTableCell>
            <CustomTableCell>UPLOADED IMAGE</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(itemParts).map((item, index) => {
            let purchaseItem = itemParts[item];
            console.log(purchaseItem)
            // count = count+1;
            // if(count == items.length)

            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell>{index+1}</CustomTableCell>
                <CustomTableCell>{purchaseItem.mainHead}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partName}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partNumber}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.quantityRequired}</CustomTableCell>
                <CustomTableCell>
                <div style={{height : '120px', width:'50%'}}>
                <img style={{height : '120px'}} src={purchaseItem.referenceImage}/>
                </div>
                </CustomTableCell>
                <CustomTableCell>
                <Button variant="raised" color="primary"
                onClick={this.onActionButton.bind(this, purchaseItem.partNumber, purchaseItem.quantityRequired, purchaseItem.mainHead)}>
                <Done />
                </Button >
                <Button variant="raised" color="secondary">
                <CloseIcon/>
                </Button>
                </CustomTableCell>
                <CustomTableCell>
                <div style={{height : '120px', width:'50%'}}>
                <img style={{height : '120px'}} src={purchaseItem.screenShot}/>
                </div>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {window.localStorage.role === this.props.items.currentOwner &&
      <div style={{marginLeft:'500px', marginTop:'20px'}}>
      <Button variant='raised' color='secondary' onClick={this.onPurchaseSubmitClick.bind(this)}>
      UPDATE
      </Button>
      </div> }
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
