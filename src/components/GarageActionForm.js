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
import GarageActionCard from '../lib/GarageActionCard.js'
import TextField from 'material-ui/TextField';
import CloseIcon from '@material-ui/icons/Close';
import {saveIndent} from '../api/allApi.js';
import Button from 'material-ui/Button';
import Videocam from '@material-ui/icons/Videocam';
import { updateIndent } from '../api/allApi.js'


export default class GarageActionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webcamClicked : false,
      openDialog: true,
      showLiveCameraFeed: true,
      actionTaken : 'NO_ACTION',
      updatedItemsFromCard : {}
    }
  }

componentDidMount () {
  this.setState({
    indentID : this.props.params.indentID,
    indentDetails : this.props.params.indentDetails
  })
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

   onItemLocked = (params) => {
     const {updatedItemsFromCard} = this.state;
     updatedItemsFromCard[params.partNumber] = params;
     this.setState({
       updatedItemsFromCard
     })
   }

   handleChange = event => {
     this.setState({ [event.target.name]: event.target.value });
     let actionValue = event.target.value;
   };


   onIndentActionTaken = () => {
     const {updatedItemsFromCard, actionTaken , indentDetails } = this.state;
     let msg = '' , data= {};

     //move below to constants

     if('ALL_ITEMS_RECEIVED'===actionTaken) {

         indentDetails.items.map((indentItem) => {
           indentItem['screenShot'] = updatedItemsFromCard[indentItem.partNumber]['screenShot'];

         })
         indentDetails.currentOwner = 'GARAGE';
         indentDetails.actionUpdateMsg= 'All items received by garage';
         indentDetails.currentOwner = 'STORE';
         indentDetails.status = 'OPEN';
         indentDetails.actionUpdateTime= new Date().toString();
         indentDetails.internalState = 'GARAGE_STORE_CONFIRMED';


        //call to update the indent details
        updateIndent(indentDetails, null, 'All items received from Store').then(() => alert('Action Successful on Indent')).catch((e) => console.log(e))
         msg = 'Indent updated successfully'

     }else if('WRONG_ITEMS_RECEIVED' === actionTaken){

     }else if('ASSIGN_TO_ADMIN' === actionTaken){

     }else if('CLOSE' == actionTaken) {

     }
     this.setState({
       openDialog : false
     },
     this.props.onIndentActionTaken(data))
   }

render() {

  const btnStyle = {
    position: 'absolute',
    top:'80px',
    left:'100px',
    height: '50px'
  }
  const { indentDetails = [], indentID, actionTaken } = this.state;


  let cardsArray =  [];
  if(indentDetails.items) {
    indentDetails.items.map((item) => {
      let mediaCardProps = {
        items : {
          mainHead : item.mainHead,
          partNumber : item.partNumber,
          GarageActionCard : item.GarageActionCard,
          screenShot : item.screenShot,
          quantityRequired: item.quantityRequired,
          renderCamera : actionTaken==='ALL_ITEMS_RECEIVED' ? true : false,
          enableInput : actionTaken === 'NO_ACTION' ? false : true,
          actionTaken
        }
      }
      cardsArray.push(<div className='card' style={{marginTop : '5%'}}>
      <GarageActionCard indentID={indentID} {...mediaCardProps} onItemLocked={this.onItemLocked} />
        </div>)
    })
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
                             <MenuItem value={'ALL_ITEMS_RECEIVED'}>All Items Received</MenuItem>
                             <MenuItem value={'WRONG_ITEMS_RECEIVED'}>Wrong Items Received</MenuItem>
                             <MenuItem value={'ASSIGN_TO_ADMIN'}>Assign to Admin</MenuItem>
                           </Select>
                      </DialogActions>
                      { actionTaken !== 'NO_ACTION' && <Button color="inherit" onClick={this.onIndentActionTaken}>
                        DONE
                      </Button> }
                    </Toolbar>
                  </AppBar>
                  {cardsArray}
              </DialogContent>
        </Dialog>
  )
}
}
