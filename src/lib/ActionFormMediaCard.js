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
          screenShot,
          showLiveCameraFeed: false
        });
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
            height={240}
            width={220}
            screenshotFormat='image/jpeg'
            onClick={this.capture.bind(this)}
          />
        );
      }
      return (
          <img src={this.state.screenShot} style={{height:'220px'}} />
      );
    }



 render() {

  const { classes, item } = this.props;
  const { isLocked, webcamClicked, showLiveCameraFeed } = this.state;
  console.log(showLiveCameraFeed)
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
        <div onClick={this.capture.bind(this)} >
          { !webcamClicked ?
            <Button color="primary" onClick={this.onCameraClick}>
            Capture
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
