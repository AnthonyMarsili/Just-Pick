import React, { Component} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Welcome from './Components/Welcome'
import JoinSession from './Components/JoinSession'
import HostSession from './Components/HostSession'
import WaitingRoom from './Components/WaitingRoom'
import SessionPage from './Components/SessionPage'
import PageNotFound from './Components/PageNotFound'
import Login from './Components/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path = "/" element = {<Welcome/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/joinSession' element = {<JoinSession/>} />
          <Route path = '/hostSession' element = {<HostSession/>} />
          <Route path = '/waitingRoom' element={(props) => <WaitingRoom {...props}/>} />
          <Route path = '/session' element={(props) => <SessionPage {...props}/>} />
          <Route path = '/404' element = {<PageNotFound/>} />
        </Routes>
      </Router>
    )
  }
}

export default App
