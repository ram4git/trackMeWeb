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
      webcamClicked: false
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onActionButton = () => {
    this.setState({ open : true })
  }

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



  render() {
  const { classes, items } = this.props;
  if(!items)
  return null;
  console.log(items)
  const { open, webcamClicked } = this.state;

  return (
    <Fragment>
    <Paper className={classes.root}>
      <Table className={classes.table} style={{marginTop:'40px', marginLeft: '150px', width:'70%' }}>
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
            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell>{index+1}</CustomTableCell>
                <CustomTableCell>{purchaseItem.mainHead}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partName}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partNumber}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.quantityRequired}</CustomTableCell>
                <CustomTableCell numeric>
                <Button onClick={this.onActionButton}>
                <Done />
                </Button>
                </CustomTableCell>
                <CustomTableCell numeric><CloseIcon/></CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
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
          <div onClick={this.capture.bind(this)} style={{position:'relative', marginTop:'200px'}}>
            { !webcamClicked ?
              <Button variant="fab" color="primary"
                    onClick={this.onCameraClick}>
                <Videocam/>
              </Button> : this.renderCamera() }
          </div>
          <div>
          <TextField label="text field" />
          </div>
          <div>
          <Button variant='raised' color='primary'>
          SUBMIT
          </Button>
          </div>
        </Dialog>
    </Fragment>
  );
}
}

ViewPurchaseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewPurchaseTable);
