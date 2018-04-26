import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import  {DialogContent,DialogActions} from 'material-ui/Dialog';
import GridList, { GridListTile } from 'material-ui/GridList';
import ActionFormMediaCard from '../lib/ActionFormMediaCard.js'
import TextField from 'material-ui/TextField';
import CloseIcon from '@material-ui/icons/Close';
import {saveIndent} from '../api/allApi.js';
import Button from 'material-ui/Button';
import Videocam from '@material-ui/icons/Videocam';


export default class GarageActionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webcamClicked : false,
      openDialog: true,
      showLiveCameraFeed: true
    }
  }

  handleClose = () => {
    this.setState({
      openDialog : false
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

  const btnStyle = {
    position: 'absolute',
    top:'80px',
    left:'100px',
    height: '50px'
  }
  const { webcamClicked, showLiveCameraFeed } = this.state
  return (

          <Dialog
              fullScreen
              open={this.state.openDialog}
              onClose={this.handleClose}
            >
              <DialogContent>
                  <AppBar>
                    <Toolbar>
                      <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="title" color="inherit" style={{flex:1}}>
                        Resolving Indent ...
                      </Typography>
                      <Typography variant="title" color="inherit" style={{color:'white'}}>
                        Action
                      </Typography>
                      <DialogActions style={{backgroundColor:'lightgoldenrodyellow'}}>
                          <Select style={{color:'black'}}
                         value={this.state.actionTaken}
                         onChange={this.handleChange}
                         inputProps={{
                           name: 'actionTaken',
                           id: 'actionTaken',
                             }}
                             >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             <MenuItem value={'COMPLETE_RETURN_TO_GARAGE'}>Complete Return to Garage</MenuItem>
                             <MenuItem value={'PARTIAL_RETURN_TO_GARAGE'}>Partial Return to Garage</MenuItem>
                             <MenuItem value={'FORWARD_TO_PURCHASE'}>Forward to Purchase</MenuItem>
                             <MenuItem value={'ASSIGN_TO_ADMIN'}>Assign to Admin</MenuItem>
                             <MenuItem value={'CLOSE'}>CLOSE</MenuItem>
                           </Select>
                      </DialogActions>
                       <Button color="inherit">
                        DONE
                      </Button> }
                    </Toolbar>
                  </AppBar>
                  <div onClick={this.capture.bind(this)} style={{position:'relative'}}>
                    { !webcamClicked ?
                      <Button variant="fab" color="primary"  style={btnStyle}
                            onClick={this.onCameraClick}>
                        <Videocam/>
                      </Button> : this.renderCamera() }
                  </div>
              </DialogContent>

        </Dialog>
  )
}
}
