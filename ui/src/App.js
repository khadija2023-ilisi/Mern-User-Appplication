import React, {  useState,Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const apiUrl = `http://localhost:8080`;
const headers = {
  'Content-Type': 'text/plain'
};
class App extends Component {
  state = {
    users: [],
    currUser:{
      username:"",
      email:"",
      age:10
    }
  };

  handleChange = prop => event => {
    this.state.currUser[prop]= event.target.value 
    //console.log(this.state.currUser);
  }

  clearData(){
    document.getElementById("username").value="";
    document.getElementById("age").value="";
    document.getElementById("email").value="";
  }

  async createUser(e) {
   e.preventDefault();
    await axios.post(apiUrl + '/user-create',{
      username:this.state.currUser.username,
      email:this.state.currUser.email,
      age:this.state.currUser.age
    });
    this.clearData();
    this.loadUsers();
  }
  
  async deleteUsers(e){
    e.preventDefault();
    await axios.delete(apiUrl + '/');
    this.loadUsers();
  }

  async loadUsers() {
    const res = await axios.get(apiUrl + '/users',{headers});
    this.setState({
      users: res.data
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <div className="form-group">
                <label htmlFor="">UserName: </label>
                <input id= "username" className="form-control" type="text" placeholder='Username'    onChange={this.handleChange('username')}/><br />
            </div> 
            <div className="form-group">
              <label htmlFor="">Email: </label>
              <input id="email" className="form-control" type="email" placeholder='Email'required={true}  onChange={this.handleChange('email')}/><br />
            </div>
            <div className="form-group">
              <label htmlFor="">Age: </label>
              <input id="age" className="form-control" type="number" placeholder='Age' required={true}  onChange={this.handleChange('age')}/>
            </div>
              <button className="btn btn-info btn-lg" type='submit' onClick={e => this.createUser(e)}>Create User</button>
          </form>
          <p></p>
          <button className='btn btn-danger ' onClick={(e)=>this.deleteUsers(e)}>Delete All Users</button>
          
        </header>
        <body>
        <div className="App">
        <h2>Users list:</h2>
         
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>

              {this.state.users.map(user => (
              <tr  key={user._id}>
                <td >{user.username}</td>
                <td >{user.email}</td>
                <td >{user.age}</td>
              </tr>
              ))}
            </tbody>
          </table>
          </div>
        </body>
      </div>
    );
  }
}

export default App;