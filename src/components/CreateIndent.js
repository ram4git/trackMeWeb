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
import { uploadImage, downloadImageUrlForItem, updateHistory } from '../api/allApi.js';
import * as firebase from 'firebase';
import FireBaseTools from '../api/firebase-tools'
import Delete from '@material-ui/icons/Delete';
import Rand from 'random-key';
import Videocam from '@material-ui/icons/Videocam';
import { Search, Grid, Header,Label } from 'semantic-ui-react'



const DEFAULT_SOURCE_SCREEN_SHOT = 'https://firebasestorage.googleapis.com/v0/b/trackme-55331.appspot.com/o/default_source.jpg?alt=media&token=6566f5ef-5645-4f76-833c-ddc843586856'
const NO_IMAGE_AVAILABLE = 'https://firebasestorage.googleapis.com/v0/b/trackme-55331.appspot.com/o/not-available.jpg?alt=media&token=c772681a-d0a4-49e8-87dc-a3680e1ac534'
class CreateIndent extends Component {
constructor(props) {
  super(props);
  this.state = {
    open: false,
    mainHead:'',
    partNumber:'',
    showLiveCameraFeed: true,
    navigateBackToJobPage : false,
    webcamClicked : false,
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
  getItemsForModelNumber('V4549108').then((data) => {
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

onCameraClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  this.setState({webcamClicked: true})
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
    if(!item.screenShot.startsWith("https")) {
      let img =  item.screenShot.replace(/^data:image\/\w+;base64,/, "");
    //  let buf = new Buffer(img, 'base64');

    uploadImage(img, this.state.jobCardID, 'GARAGE_STORE_REQUESTED', item.partNumber).then((snapshot) => {
      item.screenShot = snapshot.downloadURL;
      count = count + 1;
      if(count === items.length) {
          saveIndent(payload).then(() => {
            updateHistory(payload).then( () => {
              updateIndent(payload, null, 'Created Indent') //fire and forget - dont resolve promise
          }).catch(() =>alert('could not update history Indent'))

          this.setState({navigateBackToJobPage : true}, alert('Indent saved successfully') );
        }).catch((e) => {console.log(e); alert('could not save Indent')})
      }

      }).catch((e) => console.log(e))

    }else {
      count = count + 1;
      if(count === items.length) {
        saveIndent(payload).then(() => {
          updateHistory(payload).then( () => {
            updateIndent(payload, null,  'Created Indent') //fire and forget - dont resolve promise
          }).catch(() =>alert('could not update history Indent'))
        this.setState({navigateBackToJobPage : true}, alert('Indent saved successfully') )
        }).catch(() =>alert('could not save Indent'))
      }
    }
  })
};

  handleClose = () => {
    this.setState({open: false});
  };

  handlePropChange = prop => event => {
      this.setState({
        [prop] : event.target.value
      });

      if(prop === 'mainHead') {
        let partNumberOptions = [];
        const {parts} = this.state;
        let partsOfMainHead = parts[event.target.value];
        Object.keys(partsOfMainHead).map((partKey, index) => {
          let partDetail = partsOfMainHead[partKey];
          let ob = {
            title:partDetail.number,
            description:partDetail.name,
            girishImage : partDetail.imageName
          }
            partNumberOptions.push(ob);
        })
        this.setState({partNumberOptions})
      }

      if(prop === 'partNumber') {
        const parts = this.state.parts;
        const partName = parts[this.state.mainHead][event.target.value]['name'] || 'N/A';
        this.setState({
          partName })
      }
  };

  saveIndents = () => {
    const { mainHead, partNumber, screenShot ,quantityRequired, partName , items, URL, value } = this.state;
    let newItem = {};
    newItem.mainHead = mainHead;
    newItem.partNumber = value;
    newItem.partName = partName;
    newItem.quantityRequired = quantityRequired;
    newItem.screenShot = screenShot || NO_IMAGE_AVAILABLE;
    newItem.referenceImage = URL;

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




handleResultSelect = (e, { result }) => {
  this.setState({
    value: result.title,
    partName: result.description,
    partNumber : result.title
  })

  if(result) {
    downloadImageUrlForItem(result.girishImage).then((URL) => {
      this.setState({URL})
    }).catch((e) => console.log(e))
  }
}

resetComponent = () => {
  this.setState({
    isLoading: false
  })
}

handleSearchChange = (e, { value }) => {

  this.setState({
    isLoading: true,
    value
  })

  setTimeout(() => {
      if (value.length < 1)
      return this.resetComponent()

      this.setState({
        isLoading: false
      })
    }, 300)

    let filtered = [];
    let options = this.state.partNumberOptions;
    let givenVal = value.toUpperCase();
    if(givenVal == '')
      filtered = options
    else {
      options.forEach((opt) => {
        if(opt.title.toUpperCase().includes(givenVal) || opt.description.toUpperCase().includes(givenVal))
          filtered.push(opt)
      })
      this.setState({
        filteredOptions: filtered
      })
    }
  }

render() {
  let savedIndentsArray = [];
  const {navigateBackToJobPage,
        jobCardID,
        listOfMainHeads,
        mainHead,
        parts,
        partNumber,
        webcamClicked,
        filteredOptions,
        isLoading,
        value,
        URL} = this.state;

console.log(this.state)
  if(navigateBackToJobPage) {
    const url = "/jobcard/"+ jobCardID;
    return <Redirect push to={url}/>
  }

  let mainHeadLists = [];
  if(listOfMainHeads) {
    listOfMainHeads.forEach((mainHead, index) => {
      let menuItem = <MenuItem value={mainHead} key={index}>{mainHead}</MenuItem>;
        mainHeadLists.push(menuItem);
    })
  }

  let partItemObj = {};
  if(partNumber) {
    let partItemQty = parts[mainHead][partNumber].quantity;
    partItemObj['quantity'] = partItemQty;
    }

  let itemsArray = this.state.items;
  itemsArray.map((indent, index) => {
    let mediaCardProps = {
      text : {
        mainHead : indent.mainHead,
        partName : indent.partName,
        partNumber : indent.partNumber,
        quantityRequired: indent.quantityRequired,
        screenShot : indent.screenShot
      }
    }
    savedIndentsArray.push(<div className='card' style={{width:'70%'}} key={index}>
                            <MediaCard {...mediaCardProps} />
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

          <Grid style={{marginTop:'20px', marginLeft:'5px'}}>
            <Grid.Column width={8}>
            <Label pointing='below'>Please select the part </Label>
              <Search
                fluid={true}
                size="big"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                value={value}
                results={filteredOptions}
                />
            </Grid.Column>
          </Grid>
          <div style={{width:'23%', marginTop:'50px'}} >
          <Table>
            <TableBody>
               <TableRow>
                <TableCell>Quantity In Stores</TableCell>
                <TableCell>{partItemObj.quantity}</TableCell>
               </TableRow>
            </TableBody>
          </Table>
          </div>
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
              <img src={URL} alt='Reference image'  />
            </GridListTile>

            <GridListTile key='webcamImage' >
            <div onClick={this.capture.bind(this)} style={{position:'relative'}}>
              { !webcamClicked ?
                <Button variant="fab" color="primary"
                      onClick={this.onCameraClick}>
                  <Videocam/>
                </Button> : this.renderCamera() }
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
