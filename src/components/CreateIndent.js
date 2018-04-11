import React, { Component, Fragment } from 'react'
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


class CreateIndent extends Component {
constructor(props) {
  super(props);
  this.state = {
    open: false,
    age:''
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
handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


render() {

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
          <form className='girish' autoComplete="off">
          <FormControl className='girish'>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select className='girish'
            value={this.state.age}
            inputProps={{
            name: 'age',
            id: 'age-simple',
          }}         >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          </form>
          </DialogContent>
        </Dialog>
        <div>

        </div>
      </Fragment>
    )
  }
}

export default CreateIndent
