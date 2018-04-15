import React, { Component, Fragment } from 'react';
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



export default class ActionForm extends Component {

  constructor(props){
    super();
    this.state={
      openDialog: true,
      updatedItemsFromCard : {},
      actionTaken: 'NO_ACTION'
    }
  }


  componentDidMount(){
    console.log(this.props);
    const { indentID, indentDetails } = this.props.params;
    this.setState({
        indentID,
        indentDetails,
        loading : true
    });
    //how to achieve synchronization - study later
    const itemsInActionForm = indentDetails.items.slice();
    // itemsInActionForm.map((item) => {
    //   getPartCount(item.modelNumber, item.mainHead, item.partNumber).
    //       then((data) => {
    //           let partData = data.val();
    //           item.quantityStores= partData.count;
    //
    //       })
    //       .catch(()=> alert('error occured fetching part count'))
    //
    // })

    this.setState({itemsInActionForm})

  }

  handleClose = () => {
    this.setState({
      openDialog : false
    })
   this.props.onClose();
  };

  onIndentActionTaken = () => {
    console.log(this.props);
    this.setState({
      openDialog : false
    },
    this.props.onIndentActionTaken())
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let actionValue = event.target.value;
    //move below to constants

    const {updatedItemsFromCard} = this.state;
    let msg = '', valid=true;

    if('COMPLETE_RETURN_TO_GARAGE'===actionValue) {
      //all items approved qty == required Qty
      Object.keys(updatedItemsFromCard).map((item)=>{
        if(item.quantityApproved != item.quantityRequired){
            valid=false;
            let itemMsg = 'Part = ' + item.partNumber + 'Quantity Approved = ' + item.quantityApproved
                   + 'but Quantity Requested = ' + item.quantityRequired + '\n'
            msg += itemMsg ;
        }
      })

    }else if('PARTIAL_RETURN_TO_GARAGE' === actionValue){

    }else if('FORWARD_TO_PURCHASE' === actionValue){


    }else if('ASSIGN_TO_ADMIN' === actionValue){

    }
  };

  onItemLocked = (params) => {
    alert('received')
    console.log(params);
    const {updatedItemsFromCard} = this.state;
    updatedItemsFromCard[params.partNumber] = params;
    this.setState({
      updatedItemsFromCard
    }, console.log(this.state))
  }

  render(){

    const { itemsInActionForm = [] } = this.state;
    let cardsArray =  [];
    if(itemsInActionForm) {
      itemsInActionForm.map((itemInActionForm) => {
        let mediaCardProps = {
          item : {
            mainHead : itemInActionForm.mainHead,
            partNumber : itemInActionForm.partNumber,
            screenShot : itemInActionForm.screenShot,
            quantityRequired: itemsInActionForm.quantityRequired,
            quantityStores : itemsInActionForm.quantityStores || '24'
          }
        }
        cardsArray.push(<div className='card'><ActionFormMediaCard {...mediaCardProps} onItemLocked={this.onItemLocked} /></div>)
      })
    }

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
                  <Button color="inherit" onClick={this.onIndentActionTaken}>
                    DONE
                  </Button>
                </Toolbar>
              </AppBar>
            {cardsArray}
          </DialogContent>
          <DialogActions>
              <Select
             value={this.state.action}
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
               </Select>
          </DialogActions>
    </Dialog>



    )
  }

}
