import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading';
import {Header, Button, Icon, Select} from 'semantic-ui-react';
import { Input, Modal } from 'semantic-ui-react'

export default class CreateIndent extends Component {


    state = {
        indent : {
            modalNumber: "",
            lorryNumber: "",
            jobCard: "",
            item: []
        },
        mainHead : [],
        part : "",
        showModal : false
    }

    componentDidMount(){
        this._getMainHead();
    }

    _getMainHead = () => {
        // AJAX call to get the mainhead
    }

    _getPart = (mainHead) => {
        // AJAX call to get the getPart based on the mainPart
    }

    _createNewIndent = () => {
        //AJAX CALL TO CREATE INDENT
    }

    _addItem = () => {

    }

    _showModal = () => {
        this.setState({
            showModal : true
        });
    }

    _closeModal = () => {
        this.setState({
            showModal : false
        });
    }



  render () {
      return(
        <div>
            <h1>create indent code here</h1>
            <Input placeholder='Modal' /> <br/>
            <Input placeholder='Lorry' /> <br/>
            <Input placeholder='JobCard' /> <br/>
            <Button content='Add Item' onClick={this.state._addItem} />
            <Button content='create New Indent' onClick={this.state._createNewIndent} />
            {
                this.state.showModal &&
                <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
                    <Header icon='archive' content='Add Item'/>
                    <Modal.Content>

                        <Select placeholder='Select your country' options={this.state.mainHead}/>
                        <br/>

                        Part <Input type="text" diabled value={this.state.part}/>
                        <br/>
                        Illustration <Input type="text"/>
                        <Button>Add Image</Button>
                        Quantity <Input type="text"/>
                        Required Quantity <Input type="text"/>
                        <Button onClick={this._showModal}>
                            Add Item
                        </Button>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted>
                            <Icon name='remove'/> No
                        </Button>
                        <Button color='green' inverted>
                            <Icon name='checkmark'/> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            }
        </div>
      )
  }
}
