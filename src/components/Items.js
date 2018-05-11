import React, { Component, Fragment } from 'react';
import { getItemsForModelNumber } from '../api/allApi.js';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Search from '@material-ui/icons/Search';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainHead: '',
      partNumber: ''
    }
  }


componentDidMount() {
  //
  }

  handleChange = () => {
    const { modelNumber } = this.state;
    console.log(modelNumber);

    getItemsForModelNumber(modelNumber).then((data) => {

       let parts = data.val(); let listOfMainHeads = [];
       Object.keys(parts).map((mainHead) => {
          listOfMainHeads.push(mainHead);
          let partItem = parts[mainHead];
          console.log(partItem);
          Object.keys(partItem).map((item) => {
            let itemVal = partItem[item];
            console.log(itemVal);
          })
       })
       this.setState({
         listOfMainHeads,
         parts
       })
    })
    console.log(this.state);
  }


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


  render() {
    console.log(this.state);
    const { listOfMainHeads, mainHead, parts, partNumber } = this.state;

    let mainHeadLists = [];
    if(listOfMainHeads) {
      listOfMainHeads.forEach((mainHead, index) => {
        let menuItem = <MenuItem value={mainHead} key={index}>{mainHead}</MenuItem>;
          mainHeadLists.push(menuItem);
      })
    }

    let partNumberOptions = [];
    if(mainHead) {
      let partsOfMainHead = parts[mainHead] || [];
      Object.keys(partsOfMainHead).map((partKey, index) => {
        let partDetail = partsOfMainHead[partKey];
        console.log(partDetail)
        let menuItem = <MenuItem value={partKey} key={index}>{partDetail.name}</MenuItem>;
          partNumberOptions.push(menuItem);
      })
    }

    let partItemObj = {}; let partReservationsArr=[];
    if(partNumber) {
      let partItemQty = parts[mainHead][partNumber].quantity;
      partItemObj['quantity'] = partItemQty;
      let partReservations = parts[mainHead][partNumber].reservations;
      partReservationsArr.push(partReservations)
      }

    return (
      <Fragment>
      <form className='addItemForm'>
        <TextField
          id="modelNumber"
          label="Model Number"
          value={this.state.modelNumber}
          margin="normal"
          onChange={this.handlePropChange('modelNumber')}
        />
        <IconButton onClick={this.handleChange}>
         <Search />
        </IconButton>
      </form>
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
        {mainHeadLists}
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
      <div style={{marginTop:'30px'}}>
        <Table>
          <TableBody>
             <TableRow>
              <TableCell>Qunatity</TableCell>
              <TableCell>{partItemObj.quantity}</TableCell>
             </TableRow>
          </TableBody>
        </Table>
        <Table>
        <TableHead>
         <TableRow>
          <TableCell>INDENT ID</TableCell>
          <TableCell>QUANTITY</TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
        {partReservationsArr.map((item, index) => {
          console.log(item)
          for(var i in item) {
          return (
            <TableRow>
                   <TableCell>{i}</TableCell>
                   <TableCell>{item[i]}</TableCell>
            </TableRow>
          );
        }
        })}
        </TableBody>
        </Table>
      </div>
      </Fragment>
    )
  }
}
