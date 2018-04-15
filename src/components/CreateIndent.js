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
import {saveIndent} from '../api/allApi.js';
import { Redirect, Link } from 'react-router-dom'




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
    modelNumber : this.props.modelNumber
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

  //change id later on...for now let it be jobCardID

  const payload = {
    indentID : this.state.jobCardID,
    items : this.state.items,
    jobCardID : this.state.jobCardID
  }
  saveIndent(payload).then(() => {
    this.setState({navigateBackToJobPage : true}, alert('Indent saved successfully') )

  }
  ).catch(() =>alert('could not save Indent'))
}

  handleClose = () => {
    this.setState({open: false});
  };

  handlePropChange = prop => event => {
      this.setState({
        [prop] : event.target.value
      })
  };

  saveIndents = () => {
    const { mainHead, partNumber, screenShot ,quantityRequired , items  } = this.state;
    let newItem = {};

    newItem.mainHead = mainHead;
    newItem.partNumber = partNumber;
    newItem.partName = 'Gear box';
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


render() {
  let savedIndentsArray = [];
  const {navigateBackToJobPage , jobCardID} = this.state;

  if(navigateBackToJobPage) {
    const url = "/jobcard/"+ jobCardID;
    return <Redirect push to={url}/>

  }


  let itemsArray = this.state.items;
  itemsArray.map((indent) => {
    let mediaCardProps = {
      text : {
        title : indent.mainHead,
        number : indent.partNumber,
        screenShot : indent.screenShot
      }
    }
    savedIndentsArray.push(<div className='card'><MediaCard {...mediaCardProps} /></div>)
  })
    return (
      <Fragment>
      <Paper>
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
      <Button color="primary" variant="raised" onClick={this.handleClickOpen}>Add Item</Button>
      <Button color="secondary" variant="raised" onClick={this.onSubmit}>Submit</Button>

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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'engine'}>Engine</MenuItem>
              <MenuItem value={'gear'}>Gear</MenuItem>
              <MenuItem value={'battery'}>Battery</MenuItem>
              <MenuItem value={'brakes'}>Brake</MenuItem>
              <MenuItem value={'tiers'}>Tiers</MenuItem>

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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Gear Box</MenuItem>
              <MenuItem value={20}>Lights</MenuItem>
              <MenuItem value={30}>Tyres</MenuItem>
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
  </Fragment>
    )
  }
}

export default CreateIndent
