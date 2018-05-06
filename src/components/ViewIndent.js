import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import React, { Component, Fragment } from 'react'
import Webcam from 'react-webcam';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {getIndent} from '../api/allApi.js';
import Button from 'material-ui/Button';
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
import  {DialogContent} from 'material-ui/Dialog';
import GridList, { GridListTile } from 'material-ui/GridList';
import MediaCard from '../lib/MediaCard.js'
import TextField from 'material-ui/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { saveIndent, getAllIndents } from '../api/allApi.js';
import ActionForm from './ActionForm';
import GarageActionForm from './GarageActionForm';
import Snackbar from 'material-ui/Snackbar';
import GridlistImage from '../lib/GridlistImage.js';
import StoreDialog from '../lib/StoreDialog.js';



export default class ViewIndent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      showLiveCameraFeed: true,
      navigateBackToJobPage : false,
      items: [],
      indentDetails : {}
    }
    this.handleChange.bind(this);
  }

  componentDidMount() {

    //  { "B12": [1,2,] , "T20"}, [4,5] }
    const {indentID} = this.props;
    getIndent(indentID).then((data)=> {
      this.setState({
        indentID : indentID,
        indentDetails : data.val(),

      });
      let partNumberVsImageURL = {};
        let indentHistory = data.val().history || {} ; let count=0;
      Object.keys(indentHistory).map((key) => {
        count += 1;
        let historyObjItems = indentHistory[key]['items'];
        historyObjItems.forEach((item) => {
          let imageURLArray = partNumberVsImageURL[item.partNumber] || [];
          imageURLArray.push({
            updatedBy : indentHistory[key]['updatedBy'],
            updatedAt : indentHistory[key]['updatedTime'],
            screenShot : item.screenShot
          });
          partNumberVsImageURL[item.partNumber] = imageURLArray;

          if(count === Object.keys(indentHistory).length) {
            this.setState({
              partNumberVsImageURL
            })
          }
        })
     })
   }).catch((e) => console.log(e))
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
    }

   renderImage() {
      if(this.state.showLiveCameraFeed) {
        return (
          <Webcam
            audio={false}
            ref={this.setRef.bind(this)}
            height={480}
            width={640}
            screenshotFormat='image/jpeg'
            onClick={this.capture.bind(this)}
          />
        );
      }
      return (
          <img src={this.state.screenShot} style={{height:'640px'}} />
      );
    }

  handleUpdateClicked = () => {
      this.setState({ openDialog: true , showLiveCameraFeed : true});
      if(window.localStorage.role==='STORE') {
        this.setState({renderSToreActionForm : true})
      } else if(window.localStorage.role==='GARAGE') {
        this.setState({renderGarageActionForm : true})
      }
    };

    handleClose = () => {
      this.setState({openDialog: false});
    };

    handleCloseSnackBar = () => {
      this.setState({renderSnackBar: false}, ()=>{window.location.href='/indent/'+ this.state.indentID});
    };

    handlePropChange = prop => event => {
        this.setState({
          [prop] : event.target.value
        })
    };

  //why is this syntax different ?
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

  onIndentActionTaken(params){
    this.setState({renderSnackBar : true,
    openDialog : false})
  }


  onClose =  () => {
    this.setState({
      openDialog : false
    })
  }


  render() {
    const { navigateBackToJobPage,
            indentID,
            indentDetails,
            openDialog,
            renderSnackBar,
            partNumberVsImageURL,
            renderSToreActionForm = false,
            renderGarageActionForm= false,
            renderDefault = true} = this.state;

      const internalState = indentDetails.internalState || 'GARAGE_STORE_CONFIRMED'

    if(navigateBackToJobPage) {
      const url = "/jobcard/"+ indentDetails.jobCardID;
      return <Redirect push to={url}/>
    }else if(openDialog && indentDetails && renderSToreActionForm && internalState !== 'GARAGE_STORE_CONFIRMED') {
      const actionFormParams = {
        indentID,
        indentDetails
      }
      return <ActionForm params={actionFormParams} onIndentActionTaken={this.onIndentActionTaken.bind(this)}
                      onClose={this.onClose}/>
    }else if(openDialog && indentDetails && internalState === 'GARAGE_STORE_CONFIRMED') {
      return <StoreDialog indentID={indentID} onActionTaken={this.onIndentActionTaken.bind(this)} onClose={this.onClose} />

    }else if(openDialog && indentDetails && renderGarageActionForm) {
      const actionFormParams = {
        indentID,
        indentDetails
      }
      return <GarageActionForm params={actionFormParams} onIndentActionTaken={this.onIndentActionTaken.bind(this)}
                      onClose={this.onClose}/>
    }else if(renderSnackBar){
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

    let cardsArray =  [];

    if(!indentDetails|| Object.keys(indentDetails).length == 0 || !partNumberVsImageURL)
      return null;


    indentDetails.items.map((indent) => {
      let mediaCardProps = {
        text : {
          mainHead : indent.mainHead,
          partNumber : indent.partNumber,
          partName : indent.partName,
          quantityRequired : indent.quantityRequired
          }
      }
      let partImageURLs = partNumberVsImageURL[indent.partNumber] || []

      cardsArray.push(<div className='card' key={indent.partNumber}>
                        <MediaCard {...mediaCardProps} />
                        <GridlistImage urls= {partImageURLs} />
                      </div>)
    })
      return (
        <Fragment>
        <Paper style={{margin:'5%', width:'30%'}}>
        <Table>
          <TableBody>
             <TableRow>
              <TableCell>Jobcard Id</TableCell>
              <TableCell>{indentDetails.jobCardID}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Lorry Number</TableCell>
              <TableCell>{indentDetails.vehicleNumber}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Current Owner</TableCell>
              <TableCell><span style={{color:"red"}}>{indentDetails.currentOwner}</span></TableCell>
              </TableRow>
              <TableRow>
              <TableCell>STATUS</TableCell>
              <TableCell><span style={{color:"blue"}}>{indentDetails.status}</span></TableCell>
              </TableRow>
          </TableBody>
        </Table>
        </Paper>
        {cardsArray}
        {window.localStorage.role === indentDetails.currentOwner &&
        <div style={{marginLeft : '45%',marginTop:'5%'}}>
        <Button color="secondary" style={{}} variant="raised" onClick={this.handleUpdateClicked}>UPDATE</Button>
        </div>
        }

      </Fragment>
      )
    }
}
