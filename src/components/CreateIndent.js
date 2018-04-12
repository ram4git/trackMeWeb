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

class CreateIndent extends Component {
constructor(props) {
  super(props);
  this.state = {
    open: false,
    mainHead:'',
    partNumber:'',
    showLiveCameraFeed: true,
    items: []
  }
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
          screenshotFormat='image/jpeg'
          width={400}
          onClick={this.capture.bind(this)}
        />
      );
    }
    return (
      <GridList cellHeight={200} >
    {
        <img src={this.state.screenShot}  />
    }
  </GridList>
    );
  }

handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handlePropChange = prop => event => {
      this.setState({
        [prop] : event.target.value
      })
  };

  saveIndents = () => {
    const { mainHead, partNumber, screenShot } = this.state;
    let newItem = {};

    newItem.mainHead = mainHead;
    newItem.partNumber = partNumber;
    newItem.screenShot = screenShot;
    console.log(newItem);

    const items = this.state.items;
    console.log(items);
    items.push(newItem);
    this.setState({
      open: false,
      mainHead: '',
      partNumber: '',
      showLiveCameraFeed: true,
      items: items
    });
  }


render() {
  let savedIndentsArray = [];
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
      <Button color="secondary" variant="raised" onClick={this.handleClickOpen}>Add Item</Button>
      <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
        >

          <DialogContent>
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              </IconButton>
              <Typography variant="title" color="inherit">
                Indent Details
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          </form>
          <form className='addItemForm' autoComplete="off">
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          </form>
          <GridList cellHeight={200} className='partImage'>
        {
            <img src={require('../background.jpg')}  />
        }
      </GridList>
      <div onClick={this.capture.bind(this)} >
      {this.renderCamera() }
      </div>
      <Button color="secondary" variant="raised" onClick={this.saveIndents}>Done</Button>
      </DialogContent>
    </Dialog>
    {savedIndentsArray}
  </Fragment>
    )
  }
}

export default CreateIndent
