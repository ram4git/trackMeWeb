import React from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import LockOpen from '@material-ui/icons/LockOpen';
import Locked from '@material-ui/icons/Lock';
import Videocam from '@material-ui/icons/Videocam';
import { uploadImage } from '../api/allApi.js';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';


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
     flex:0.5,
     margin : '20px'
   },
   text: {
   marginBottom: 16,
   marginLeft : 20,
   fontSize: 24,
  },
  textDiv : {
    flex:0.5
  },
  label : {
    fontSize : '16px',
    color : 'rgba(0, 0, 0, 0.54)',
    margin : '10px'
  },
  value : {
    fontSize : '16px',
    color : 'black',
    margin : '10px'
  }
};





class ActionFormMediaCard extends React.Component {
  state = {
    quantityApproved: '',
    quantityPurchase : '' ,
    showLiveCameraFeed: true,
    webcamClicked: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount () {
    const { indentID , items } = this.props;
    const { mainHead, partNumber, quantityStores, quantityRequired  } = this.props.items;
    this.setState({
      indentID,
      partNumber,
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
      quantityApproved : this.state.quantityApproved,
      screenShot : this.state.screenShot
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

  capture() {
      if(this.state.showLiveCameraFeed) {
        const screenShot = this.webcam.getScreenshot();
        this.setState({
          showLiveCameraFeed: false
        });

        let img =  screenShot.replace(/^data:image\/\w+;base64,/, "");
        let role = window.localStorage.role
        uploadImage(img, this.state.indentID, role, this.state.partNumber).then((snapshot) => {
          let URL = snapshot.downloadURL;
          this.setState({screenShot : URL});
        }).catch((e) => console.log(e));

      } else {
        this.setState({
          showLiveCameraFeed: true
        });
      }
      console.log(this.state)
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



 render() {
   const { screenShot,mainHead, partNumber } = this.state;
   const {  classes } = this.props;

   if(screenShot) {

  }

const btnStyle = {
  position: 'absolute',
  top:'80px',
  left:'100px',
  height: '50px'
}
  const { isLocked, webcamClicked, showLiveCameraFeed , quantityStores ,
     quantityApproved , quantityRequired } = this.state;
  return (
    <div>
      <Card className={classes.card}>
      <div className={classes.textDiv}>
        <CardContent>
        <Table>
          <TableBody>
             <TableRow>
              <TableCell className={classes.label}>Group :</TableCell>
              <TableCell className={classes.value}>{mainHead}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.label}>Part Number : </TableCell>
                <TableCell className={classes.value}>{partNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.label}>Qty(stores): </TableCell>
                <TableCell className={classes.value}>{quantityStores}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.label}>Qty(Reqd) : </TableCell>
                <TableCell className={classes.value}>{quantityRequired}</TableCell>
              </TableRow>
          </TableBody>
        </Table>

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
        />
        <div onClick={this.capture.bind(this)} style={{position:'relative'}}>
          { !webcamClicked ?
            <Button variant="fab" color="primary"  style={btnStyle}
                  onClick={this.onCameraClick}>
              <Videocam/>
            </Button> : this.renderCamera() }
        </div>
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
