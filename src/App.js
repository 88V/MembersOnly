import React from 'react';
import './App.css';
import { Component } from 'react';
import {Table, Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';


class App extends Component {

  state = {
    people: [],
    newPersonData: {
      firstName: '',
      lastName: ''
    },
    editPersonData: {
      id: '',
      firstName: '',
      lastName: ''
    },
    newPersonModal: false,
    editPersonModal: false

  }

  componentDidMount() {
   this._refreshPeople();
  }

toggleEditPersonModal(){
 this.setState({
   editPersonModal: ! this.state.editPersonModal
 });
}

toggleNewPersonModal(){
  this.setState({
    newPersonModal: ! this.state.newPersonModal
  });
 }

addPerson = async () => {
  axios.post('https://coolapi.azurewebsites.net/api/people', this.state.newPersonData).then((response) => {
    let { people } =this.state;


    people.push(response.data);

    this.setState({people, newPersonModal: false, newPersonData: {
      firstName: '',
      lastName: ''
    }});
  });
}

updatePerson = async () => {
  let {id, firstName, lastName } = this.state.editPersonData;
 axios.put('https://coolapi.azurewebsites.net/api/people/' + this.state.editPersonData.id, {
   id, firstName, lastName
 }).then((response => {
   this._refreshPeople();
  this.setState({
    editPersonModal: false, editPersonData: {id: '', firstName: '', lastname: ''}
  })
 }))
}


editPerson = async (id, firstName, lastName ) => {
 this.setState({
   editPersonData: {id, firstName, lastName }, editPersonModal: ! this.state.editBookModal
 })

}

_refreshPeople(){
  axios.get('https://coolapi.azurewebsites.net/api/people').then((response) => {
    this.setState({
      people: response.data
    })
  });
}

deletePerson(id) {
  axios.delete('https://coolapi.azurewebsites.net/api/people/' + id).then((response) => {
    this._refreshPeople();
  });
}

 render() {

  let people = this.state.people.map((person) => {
    return (
      <tr key={person.id}>
     
      <td>{person.firstName}</td>  
      <td>{person.lastName}</td>  
      <td>
      <button className=" btn-2" onClick={this.editPerson.bind(this, person.id, person.firstName, person.lastName )}>Edit</button>
     
      <button className="btn-2 delete" onClick={this.deletePerson.bind(this, person.id )}>Delete</button>
      </td>  
    </tr>
    )
  })
   return (
     <div className = "App container">

        <h1 className="title">People</h1>
        <h3 className = 'name'>John San Pietro</h3>
        <h4 className ='email'>HireMe@JohnSP.com</h4>
      
       
        <button className="custom-btn btn-12 my-3" onClick={this.toggleNewPersonModal.bind(this)}><span>Add New</span><span>Add Person</span></button>
       <div className ='box'>
        <i className="fas fa-database icon"><h3 className= 'iconText'>SQL Server</h3></i>
        <i className="fab fa-windows windows icon"><h3 className='iconText'>Azure WebAPI</h3></i>
        <i className="fab fa-react icon"><h3 className ='iconText'>React</h3></i>
        </div>


        <Modal className ='modaltitle'  isOpen={this.state.newPersonModal} toggle={this.toggleNewPersonModal.bind(this)}>
        <ModalHeader className='modalbody' toggle={this.toggleNewPersonModal.bind(this)}>Add a new person</ModalHeader>
        <ModalBody className ='modalbody'>
        <FormGroup>
        
        <Input  id="Fname" placeholder="First Name" value={this.state.newPersonData.firstName} onChange={(e) =>{
          let {newPersonData} = this.state;

          newPersonData.firstName = e.target.value;
          
          this.setState({newPersonData})
        }} />
        
      </FormGroup> 
      <FormGroup>
        
        
      <Input  id="Lname" placeholder="Last Name" value={this.state.newPersonData.lastName} onChange={(e) =>{
          let {newPersonData} = this.state;

          newPersonData.lastName = e.target.value;
          
          this.setState({newPersonData})
        }} /> 
      
      </FormGroup>
             </ModalBody>
        <ModalFooter className='modalbody'>
        <button className=" btn-2"onClick={this.addPerson.bind(this)}>Add Now</button>
          
          <button className=" btn-2"onClick={this.toggleNewPersonModal.bind(this)}>Cancel</button>
        
        </ModalFooter>
      </Modal>



      {/* Number 2* Edit*/}


      <Modal className='modaltitle' isOpen={this.state.editPersonModal} toggle={this.toggleEditPersonModal.bind(this)}>
        <ModalHeader className = 'modalbody' toggle={this.toggleEditPersonModal.bind(this)}>Edit a person</ModalHeader>
        <ModalBody className ='modalbody'>
        <FormGroup>
        
        <Input  id="Fname" placeholder="First Name" value={this.state.editPersonData.firstName} onChange={(e) =>{
          let {editPersonData} = this.state;

          editPersonData.firstName = e.target.value;
          
          this.setState({editPersonData})
        }} />
        
      </FormGroup> 
      <FormGroup>
        
        
      <Input  id="Lname" placeholder="Last Name" value={this.state.editPersonData.lastName} onChange={(e) =>{
          let {editPersonData} = this.state;

          editPersonData.lastName = e.target.value;
          
          this.setState({editPersonData})
        }} /> 
      
      </FormGroup>
             </ModalBody>
        <ModalFooter className = 'modalbody'>
        <button className=" btn-2"onClick={this.updatePerson.bind(this)}>Save</button>
        <button className=" btn-2"onClick={this.toggleEditPersonModal.bind(this)}>Cancel</button>
         
        </ModalFooter>
      </Modal>
      
       <Table  className = 'table'>  
          <thead className='thead' >
            <tr>
          
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
        {people}
          </tbody>
       </Table>
     </div>
   );
 }
}

export default App;