import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { updateIndentStatus } from '../api/allApi.js';


export default class StoreDialog  extends Component {


  constructor() {
    super();
    this.state = {
      value : '',
      openDialog : true
    };
  }


  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    this.setState({
      openDialog : false
    })
      this.props.onClose();
    };

    handleOk = () => {
      this.setState({
        openDialog : false
      })
      updateIndentStatus(this.props.indentID, this.state.value);
      this.props.onActionTaken();
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };


  render() {

    const options = [
      {'name' : 'CLOSE (Old Items Received)' , 'key' : 'close_old_items_received', 'value' : 'CLOSE (Old Items Received)'},
      {'name' :  'CLOSE (Old Items NOT Received)', 'key':'close_old_items_not_received', 'value' : 'CLOSE (Old Items NOT Received)' },
      {'name' :  'Assign back to Garage', 'key':'assign_back_to_garage', 'value' : 'Assign back to Garage' },
      {'name' :  'Assign to ADMIN', 'key':'assign_to_admin', 'value' : 'Assign to ADMIN' }
    ];

    return (
        <Dialog
          maxWidth="md"
          onEntering={this.handleEntering}
          aria-labelledby="confirmation-dialog-title"
          fullWidth={true}
          open={this.state.openDialog}
        >
          <DialogTitle id="confirmation-dialog-title">Chose Action</DialogTitle>
          <DialogContent>
            <RadioGroup
              ref={node => {
                this.radioGroup = node;
              }}
              aria-label="ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleChange}>
              {options.map(option => (
                <FormControlLabel value={option.value} key={option.value} control={<Radio />} label={option.name} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );

  }

}
