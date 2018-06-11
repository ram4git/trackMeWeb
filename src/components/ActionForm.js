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
import { updateIndent, updatePartCount } from '../api/allApi.js'
import Rand from 'random-key';
import { reserveParts, getPartCount } from '../api/allApi.js';


const DEFAULT_SCREEN_SHOT = 'https://firebasestorage.googleapis.com/v0/b/trackme-55331.appspot.com/o/not-available.jpg?alt=media&token=c772681a-d0a4-49e8-87dc-a3680e1ac534'


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
    const { indentID, indentDetails } = this.props.params;
    this.setState({
        indentID,
        indentDetails,
        modelNumber : indentDetails.modelNumber,
        loading : true
    });


    //how to achieve synchronization - study later
    const itemsInActionForm = indentDetails.items.slice();
    console.log(itemsInActionForm)
    //TODO change model number
    itemsInActionForm.map((item) => {
      getPartCount('V4549108', item.mainHead, item.partNumber).
          then((data) => {
              let partData = data.val();
              //add reservations
              let reservations = partData.reservations;
              if(reservations && reservations[indentID]){
                item.quantityStores= (Number(partData.quantity) + Number(reservations[indentID])).toString();
              }else{
                item.quantityStores= partData.quantity;
              }
              this.setState({itemsInActionForm})
          })
          .catch(()=> alert('error occured fetching part count'))
    })


  }

  handleClose = () => {
    this.setState({
      openDialog : false
    })
   this.props.onClose();
  };

  onIndentActionTaken = () => {
    const {updatedItemsFromCard, actionTaken , indentDetails } = this.state;
    let msg = '' , data= {};

    //move below to constants

    if('COMPLETE_RETURN_TO_GARAGE'===actionTaken) {
      let  valid=true;
      //all items approved qty == required Qty
      Object.keys(updatedItemsFromCard).map((item)=>{
        if(item.quantityApproved != item.quantityRequired){
            valid=false;
            let itemMsg = 'Part = ' + item.partNumber + 'Quantity Approved = ' + item.quantityApproved
                   + 'but Quantity Requested = ' + item.quantityRequired + '\n'
            msg += itemMsg ;
        }
      })

      if(valid) {

        //indentDetails is the input - copy all the modifications done as part of this actionform to the input

        indentDetails.items.map((indentItem) => {
          indentItem['quantityApproved'] = updatedItemsFromCard[indentItem.partNumber]['quantityApproved'];
          indentItem['quantityPurchase'] = updatedItemsFromCard[indentItem.partNumber]['quantityPurchase'];
          indentItem['screenShot'] = updatedItemsFromCard[indentItem.partNumber]['screenShot'] || DEFAULT_SCREEN_SHOT;

        })
        indentDetails.currentOwner = 'GARAGE';
        indentDetails.actionUpdateMsg= 'All items returned to garage';
        indentDetails.currentOwner = 'GARAGE';
        indentDetails.status = 'OPEN';
        indentDetails.internalState = 'STORE_GARAGE_GRANTED'
        indentDetails.actionUpdateTime= new Date().toString();

        //call to update the count
        updatePartCount(indentDetails).
            then()
        .catch(()=> alert('error occured fetching part count'))

       //call to update the indent details
       updateIndent(indentDetails, null, 'Returned all items to Garage').then(() => alert('Action Successful on Indent')).catch((e) => console.log(e))
        msg = 'Indent updated successfully'
      }

        data.message = msg;

    }else if('PARTIAL_RETURN_TO_GARAGE' === actionTaken){
      let valid=false;
      Object.keys(updatedItemsFromCard).map((item)=>{
        if(item.quantityApproved != '0'){
            valid=true;
        }
      });

      let splitIndentItems = [], indentItemsCopy=[];
      const splitIndentDetails = Object.assign({} , indentDetails);
      if(valid){
        indentDetails.items.map((indentItem) => {
          let updatedItemFromCard = updatedItemsFromCard[indentItem.partNumber];
          if(updatedItemFromCard['quantityApproved'] != '' && updatedItemFromCard['quantityApproved'] !='0'){
            indentItem['quantityApproved'] = updatedItemFromCard['quantityApproved'];
            indentItem['quantityPurchase'] = '0';
            indentItem['quantityRequired'] = updatedItemFromCard['quantityApproved']
            indentItemsCopy.push(indentItem);
          }else {
            indentItem['quantityRequired'] = updatedItemFromCard['quantityPurchase'];
            indentItem['quantityApproved'] = '0';
            indentItem['quantityPurchase'] = updatedItemFromCard['quantityPurchase']
            splitIndentItems.push(indentItem);
          }
        })
        indentDetails.items = indentItemsCopy;
        indentDetails.status='ITEMS_RETURNED_OLD_PARTS_EXPECTED';
        indentDetails.currentOwner = 'GARAGE';
        indentDetails.actionUpdateMsg= 'All items returned to garage';
        indentDetails.actionUpdateTime= new Date();
        //call to update the count
        updatePartCount(indentDetails).
            then()
        .catch(()=> alert('error occured fetching part count'))

       //call to update the indent details
       updateIndent(indentDetails).then(alert('success')).catch(alert('error'))
        msg = 'Indent updated successfully'


        splitIndentDetails.items=splitIndentItems;
        splitIndentDetails.status='FORWARDED_TO_PURCHASE';
        splitIndentDetails.currentOwner = 'PURCHASE';
        splitIndentDetails.actionUpdateMsg= 'Indent forwarded to purchase';
        splitIndentDetails.actionUpdateTime= new Date();

        let indentIDNew = splitIndentDetails.jobCardID +  Rand.generateBase30(2);

        const payload = {
          indentID : indentIDNew ,
          items : splitIndentDetails.items,
          jobCardID : splitIndentDetails.jobCardID,
          modelNumber : splitIndentDetails.modelNumber
        }

        saveIndent(payload).then(alert('success')).catch(alert('error'));
        updateIndent(splitIndentDetails).then(alert('success')).catch(alert('error'))
         msg = 'Indent updated successfully'


      }


    }else if('FORWARD_TO_PURCHASE' === actionTaken){

      let  valid=false;
      //atleast one item purchase quantity is > 0
      Object.keys(updatedItemsFromCard).map((item)=>{
        if(item.quantityPurchase != '' || item.quantityPurchase != '0'){
            valid=true;
        }
      })

      if(valid) {

        //indentDetails is the input - copy all the modifications done as part of this actionform to the input
        let originalItems = indentDetails.items.slice() ;
        originalItems.map((indentItem) => {
          indentItem['quantityReserved'] = updatedItemsFromCard[indentItem.partNumber]['quantityApproved'];
          indentItem['quantityPurchase'] = updatedItemsFromCard[indentItem.partNumber]['quantityPurchase'];
          if(indentItem['quantityPurchase'] == '0')
            indentItem['purchaseNotRequired'] = true;
        })


        indentDetails.items.map((indentItem) => {
          indentItem['quantityReserved'] = updatedItemsFromCard[indentItem.partNumber]['quantityApproved'];
          indentItem['quantityPurchase'] = updatedItemsFromCard[indentItem.partNumber]['quantityPurchase'];
          if(indentItem['quantityPurchase'] == '0' || indentItem['quantityPurchase'] == '')
            indentItem['purchaseNotRequired'] = true;

          indentItem['screenShot'] = updatedItemsFromCard[indentItem.partNumber]['screenShot']|| DEFAULT_SCREEN_SHOT;
        })
        indentDetails.status='FORWARDED_TO_PURCHASE';
        indentDetails.internalState='STORE_PURCHASE_REQUESTED';
        indentDetails.currentOwner = 'PURCHASE';
        indentDetails.actionUpdateMsg= 'Forwarded to purchase';
        indentDetails.actionUpdateTime= new Date().toString();


        //call to update the count
        reserveParts(indentDetails).
            then()
        .catch(()=> alert('error occured updating part count'))

       //call to update the indent details
       //use this flag not to deduct the count again
       indentDetails.countUpdated = true;
       updateIndent(indentDetails, originalItems, 'Forwared to purchase').then(()=> alert('success')).catch(() => alert('error'))
        msg = 'Indent updated successfully'
      }

        data.message = msg;

    }else if('ASSIGN_TO_ADMIN' === actionTaken){

    }else if('CLOSE' == actionTaken) {

    }
    this.setState({
      openDialog : false
    },
    this.props.onIndentActionTaken(data))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let actionValue = event.target.value;
  };

  onItemLocked = (params) => {
    const {updatedItemsFromCard} = this.state;
    updatedItemsFromCard[params.partNumber] = params;
    this.setState({
      updatedItemsFromCard
    })
  }

  render(){

    const { itemsInActionForm = [], indentID, actionTaken } = this.state;
    let cardsArray =  [];
    if(itemsInActionForm) {
      itemsInActionForm.map((itemInActionForm, index) => {
        let mediaCardProps = {
          items : {
            mainHead : itemInActionForm.mainHead,
            partNumber : itemInActionForm.partNumber,
            screenShot : itemInActionForm.screenShot,
            quantityRequired: itemInActionForm.quantityRequired,
            quantityStores : itemInActionForm.quantityStores,
            referenceImage: itemInActionForm.referenceImage,
            renderCamera : actionTaken==='COMPLETE_RETURN_TO_GARAGE' ? true : false,
            enableInput : actionTaken === 'NO_ACTION' ? false : true,
            actionTaken
          }
        }
        cardsArray.push(<div className='card' key={index} style={{marginTop : '5%'}}><ActionFormMediaCard indentID={indentID} {...mediaCardProps} onItemLocked={this.onItemLocked} /></div>)
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
                    <span style={{paddingLeft: '440px'}}>Please select an action on the right to edit</span>
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
