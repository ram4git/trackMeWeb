import React, { Component, Fragment } from 'react'
import Webcam from 'react-webcam';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import ViewJobCard from './ViewJobCard'
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
import {saveIndent,getItemsForModelNumber, updateIndent} from '../api/allApi.js';
import { Redirect, Link } from 'react-router-dom'
import { uploadImage, downloadImage } from '../api/allApi.js';
import * as firebase from 'firebase';
import FireBaseTools from '../api/firebase-tools'
import Delete from '@material-ui/icons/Delete';
import Rand from 'random-key';


class CreateIndent extends Component {
constructor(props) {
  super(props);
  this.state = {
    open: false,
    mainHead:'',
    partNumber:'',
    showLiveCameraFeed: true,
    navigateBackToJobPage : false,
    items: []
  }
  this.handleChange.bind(this);
}

componentDidMount() {

  if(this.props) {

  this.setState({
    vehicleNumber : this.props.vehicleNumber,
    jobCardID : this.props.jobCardID,
    modelNumber : this.props.modelNumber || 'M1312'
  })
  getItemsForModelNumber('M1312').then((data) => {
     let parts = data.val(); let listOfMainHeads = [];
     Object.keys(parts).map((mainHead) => {
        listOfMainHeads.push(mainHead);
     })
     this.setState({listOfMainHeads, parts})
  })
  }

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

handleClickOpen = () => {
    this.setState({ open: true , showLiveCameraFeed : true});
  };

onSubmit = () => {

  let mathRandom = Rand.generateBase30(1);

   const {items }  =  this.state;
   const  indentID = this.state.jobCardID + '-'+ mathRandom  ; // change later


  const payload = {
    indentID,
    items ,
    jobCardID : this.state.jobCardID,
    modelNumber : this.state.modelNumber || 'M1312',
    createdAt : new Date().toString(),
    vehicleNumber : this.state.vehicleNumber,
    currentOwner : 'STORE',
    internalState : 'GARAGE_STORE_REQUESTED',
    status : 'OPEN'
  }
  let count = 0;

  console.log(items);

  items.forEach((item) => {
    if(item.screenShot) {
      let img =  item.screenShot.replace(/^data:image\/\w+;base64,/, "");
    //  let buf = new Buffer(img, 'base64');

    uploadImage(img, this.state.jobCardID, window.localStorage.role, item.partNumber).then((snapshot) => {
      item.screenShot = snapshot.downloadURL;
      count = count + 1;
      if(count === items.length) {
        saveIndent(payload).then(() => {
          //update the history


          updateIndent(payload, null) //fire and forget - dont resolve promise

          this.setState({navigateBackToJobPage : true}, alert('Indent saved successfully') )

        }
        ).catch(() =>alert('could not save Indent'))
      }

      }).catch((e) => console.log(e))
    }
  })




}

  handleClose = () => {
    this.setState({open: false});
  };

  handlePropChange = prop => event => {
      this.setState({
        [prop] : event.target.value
      });


      if(prop === 'partNumber') {
        const parts = this.state.parts;
        const partName = parts[this.state.mainHead][event.target.value]['name'] || 'N/A';
        this.setState({ partName })
      }

  };

  saveIndents = () => {
    const { mainHead, partNumber, screenShot ,quantityRequired, partName , items } = this.state;
    let newItem = {};

    newItem.mainHead = mainHead;
    newItem.partNumber = partNumber;
    newItem.partName = partName;
    newItem.quantityRequired = quantityRequired;
    newItem.quantityStores = '120';
    newItem.screenShot = screenShot;

    items.push(newItem);

    this.webcam=null;
    this.setState({
      open: false,
      mainHead: '',
      partNumber: '',
      showLiveCameraFeed: false,
      quantityRequired:'',
      items: items
    });
  }


//why is this syntax different ?
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



download = () => {
  const storageRef = firebase.storage().ref();
  let indentId = this.state.jobCardID;
  let role = window.localStorage.role;
  let path = 'indents/'+indentId+'/'+role+'/'+'999'+'.jpeg';
  return storageRef.child(path).getDownloadURL().then(function(url) {
    let URL = url;
  }).catch((e) => console.log(e))
}

render() {
  let savedIndentsArray = [];
  const {navigateBackToJobPage , jobCardID, listOfMainHeads, mainHead, parts } = this.state;

  if(navigateBackToJobPage) {
    const url = "/jobcard/"+ jobCardID;
    return <Redirect push to={url}/>
  }

  let mainHeadLists = [];
  if(listOfMainHeads) {
    listOfMainHeads.forEach((mainHead) => {
      let menuItem = <MenuItem value={mainHead}>{mainHead}</MenuItem>;
        mainHeadLists.push(menuItem);
    })
  }

  let partNumberOptions = [];
  if(mainHead) {
    let partsOfMainHead = parts[mainHead] || [];
    Object.keys(partsOfMainHead).map((partKey) => {
      let partDetail = partsOfMainHead[partKey];
      let menuItem = <MenuItem value={partKey}>{partDetail.name}</MenuItem>;
        partNumberOptions.push(menuItem);
    })
  }


  let itemsArray = this.state.items;
  itemsArray.map((indent) => {
    let mediaCardProps = {
      text : {
        mainHead : indent.mainHead,
        partName : indent.partName,
        partNumber : indent.partNumber,
        quantityRequired: indent.quantityRequired,
        screenShot : indent.screenShot
      }
    }
    savedIndentsArray.push(<div className='card' style={{width:'70%'}}><MediaCard {...mediaCardProps} />
    </div>)
  })

  const pStyle = {
    float: 'right',
    margin: '3%'
  };

    return (
      <Fragment>
      <h2 style={{ marginLeft :'5%'}} >Creating INDENT for job...</h2>
      <div style={pStyle}>
      <Button color="primary" variant="raised" onClick={this.handleClickOpen}>Add Item</Button>
      </div>
      <Paper style={{width:'30%', margin: '5%'}}>
      <Table>
        <TableBody>
           <TableRow>
            <TableCell>Jobcard Id</TableCell>
            <TableCell>{this.state.jobCardID}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Lorry Number</TableCell>
            <TableCell>{this.state.vehicleNumber}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Model Number</TableCell>
            <TableCell>{this.state.modelNumber}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
      </Paper>
      <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
        >

          <DialogContent>
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{flex:1}}>
                Indent Details
              </Typography>
              <Button color="inherit" onClick={this.saveIndents}>
                SAVE
              </Button>
            </Toolbar>
          </AppBar>
          <form className='addItemForm' autoComplete="off">
          <FormControl className='addItemSelect'>
            <InputLabel htmlFor="mainHead">Group/Main Head</InputLabel>
            <Select
            value={this.state.mainHead}
            onChange={this.handlePropChange('mainHead')}
            inputProps={{
            name: 'mainHead',
            id: 'mainHead',
            }}>
            {  mainHeadLists }
            </Select>
          </FormControl>
          </form>
          <form className='partImage' autoComplete="off">
          <FormControl className='addItemSelect'>
            <InputLabel htmlFor="partNumber">Item/Part</InputLabel>
            <Select
            value={this.state.partNumber}
            onChange={this.handlePropChange('partNumber')}
            inputProps={{
            name: 'partNumber',
            id: 'partNumber',
            }}>
            {partNumberOptions}
            </Select>
          </FormControl>
          </form>
          <TextField className="partImage"
             id="quantity"
             label="Quantity Required"
             value={this.state.quantityRequired}
             onChange={this.handleChange('quantityRequired')}
             margin="normal"
          />

          <h3 className='partImage'>Reference Image of the component is displayed below : </h3>
          <GridList cellHeight='auto' cols={2} >

            <GridListTile key='referenceImage' >
              <img src={require('../background.jpg')} alt='Reference image'  />
            </GridListTile>

            <GridListTile key='webcamImage' >
              <div onClick={this.capture.bind(this)} >
                {this.renderCamera() }
              </div>
            </GridListTile>

          </GridList>

          <GridList cellHeight='auto' cols={1} className='partImage'>

          </GridList>
      </DialogContent>
    </Dialog>
    {savedIndentsArray}

    { savedIndentsArray.length > 0  &&
    <div style={{marginLeft : '45%',marginTop:'5%'}}>
    <Button color="secondary" variant="raised" onClick={this.onSubmit}>Submit</Button>
    </div> }

  </Fragment>
    )
  }
}

export default CreateIndent
