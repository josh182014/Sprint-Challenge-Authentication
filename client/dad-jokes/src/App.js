import React from 'react';
import axios from 'axios'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Jokes from './jokes/Jokes'
import './App.css';

class App extends React.Component {

  state = {
    jokes: []

  }

  componentDidMount = () => {
    this.getJokes()
  }

  getJokes = () => {
    const endpoint = 'http://localhost:3300/api/jokes';

    const requestConfig = {
      headers: {
        authorization: localStorage.getItem('jwt')
      },
    };

    axios
      .get(endpoint, requestConfig)
      .then(res => {
        this.setState({jokes: res.data})
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleLogin = (user) => {
    const endpoint = 'http://localhost:3300/api/login';
    axios
      .post(endpoint, user)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.getJokes()
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleRegister = (user) => {
    const endpoint = 'http://localhost:3300/api/register';
    axios
      .post(endpoint, user)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.getJokes()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <h1>Dad Jokes</h1>
        <main>
          <Route path='/login'
            render={props => (
              <Login {...props}
              handleLogin={this.handleLogin}
              />
            )}
            />
          <Route path='/register'
          render={props => (
            <Register {...props}
            handleRegister={this.handleRegister}
            />
          )}
          />
          <Route path='/jokes'
          render={props => (
            <Jokes {...props}
            jokes={this.state.jokes}
            getJokes={this.getJokes}
            />
          )}
          />
        
        </main>
      </div>
    </Router>
    );
  }
}

export default App;
