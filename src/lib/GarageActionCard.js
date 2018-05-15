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





class GarageActionCard extends React.Component {
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
    const { mainHead, partNumber, quantityRequired, partName  } = this.props.items;
    this.setState({
      indentID,
      partNumber,
      mainHead ,
      partNumber,
      partName,
      quantityRequired
    })

  }

  wantsToLock = () => {
    let itemProps = {
      mainHead: this.state.mainHead,
      partNumber: this.state.partNumber,
      partName : this.state.partName,
      quantityRequired : this.state.quantityRequired,
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
        let action = 'GARAGE_RECEIVED' ;
        uploadImage(img, this.state.indentID, action, this.state.partNumber).then((snapshot) => {
          let URL = snapshot.downloadURL;
          this.setState({screenShot : URL});
        }).catch((e) => console.log(e));

      } else {
        this.setState({
          showLiveCameraFeed: true
        });
      }
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
   const { screenShot,mainHead, partNumber, partName } = this.state;
   const {  classes, items } = this.props;
   console.log(partName);
   console.log(this.state);
   const enableInput = items.enableInput;
   const actionTaken = items.actionTaken;
   const renderCam = items.renderCamera;


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
      <div className={classes.card}>

        <CardMedia
         className={classes.cover}
         image={require('../background.jpg')}
        />
        <div onClick={this.capture.bind(this)} style={{position:'relative'}}>
          { !webcamClicked ?
            <Button variant="fab" color="primary"  style={btnStyle} disabled={!renderCam}
                  onClick={this.onCameraClick}>
              <Videocam/>
            </Button> : this.renderCamera() }
        </div>
        </div>
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
                <TableCell className={classes.label}>Part Name : </TableCell>
                <TableCell className={classes.value}>{partName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.label}>Qty(Reqd) : </TableCell>
                <TableCell className={classes.value}>{quantityRequired}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
          <Button variant="fab" color="secondary" aria-label="DONE" style = { !isLocked ? {display:'none'} : {float:'right',marginBottom:'16px'} }
            onClick={this.wantsToUnLock} disabled={!enableInput}>
            <Locked/>
          </Button>
          <Button variant="fab" color="primary" aria-label="DONE" style = { isLocked ? {display:'none'} : {float:'right',marginBottom:'16px'} }
                onClick={this.wantsToLock} disabled={!enableInput}>
            <LockOpen/>
          </Button>
        </CardContent>

      </div>


      </Card>
    </div>
  );
}
}

GarageActionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(GarageActionCard)
