import React, { Component} from 'react'
import StartSessionButton from './StartSessionButton.js'
import { Link, Navigate} from 'react-router-dom'
import NavigationPrompt from "react-router-navigation-prompt";
import { Beforeunload } from 'react-beforeunload' // did not work

class WaitingRoom extends Component {
  constructor(props) { // the constructor is required to add state to the component
    super(props)
    this.state = {
      users: [],
      nonHostClickDisabled: true,
      redirectToSession: false,
      redirectToHome: false
    }
    this.intervalID = 0
    this.fetchUsers = this.fetchUsers.bind(this)
    this.makeNotJoinable = this.makeNotJoinable.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
  }

  componentDidMount() {
    if(typeof this.props.location.data !== 'undefined')
      this.fetchUsers()
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
    //const { host } = this.props.location.data
    // const { session } = this.props.location.data // this should be able to happen in didmount and we set a session state var but it doesnt
    // const { userID } = this.props.location.data
    // const { host } = this.props.location.data
    // window.onbeforeunload = () => this.deleteSession(session, userID, host) // regular is = null
    window.onbeforeunload = null

  }

  componentDidUpdate() {
    window.onbeforeunload = () => true
  }

  deleteSession(session, userID, host) {
    //API.graphql({query: deleteUser, variables: {input: {id: userID}}})
    //if(host)
    //  API.graphql({ query: deleteSession, variables: {input: {id: session.id}}})
  }

  deleteUser() {
    const { session } = this.props.location.data // this should be able to happen in didmount and we set a session state var but it doesnt
    const { userID } = this.props.location.data
    var userList = []
    //API.graphql({ query: getSession, variables: {id: session.id}}).then(response => {
    //  userList = response.data.getSession.joinedUsers
    //  const indexOfUser = userList.indexOf(userID)
    //  userList.splice(indexOfUser, 1)
    //  API.graphql({ query: updateSession, variables: {input: {id: session.id, joinedUsers: userList}}})
    //})
    //API.graphql({query: deleteUser, variables: {input: {id: userID}}})
  }

  fetchUsers() {
    const { session } = this.props.location.data // this should be able to happen in didmount and we set a session state var but it doesnt
    // API.graphql({ query: getSession, variables: {id: session.id}}).then(response => {
    //   try {
    //     this.setState({
    //       users: response.data.getSession.joinedUsers
    //     })
    //     if(!response.data.getSession.joinable) { // once the host clicks start
    //       this.setState({
    //         redirectToSession: true
    //       })
    //     }
    //     //this.intervalID = setTimeout(this.fetchUsers.bind(this), 4000)
    //   }
    //   catch (err) {
    //     alert("Sorry, this session is no longer active.")
    //     this.setState({
    //       redirectToHome: true
    //     })
    //   }
    // })
  }

  makeNotJoinable() {
    const { session } = this.props.location.data // this should be able to happen in didmount and we set a session state var but it doesnt
    // API.graphql({ query: updateSession, variables: {input: {id: session.id, joinable: false}}})
    // this.setState({
    //   nonHostClickDisabled: false,
    // })
  }

  render() {
    if(typeof this.props.location.data === 'undefined' || this.state.redirectToHome) { // idk why the second part didnt work below this.state.redirectToSession ? <Rdirect... : null
      return (
        <Navigate to= '/' />
      )
    }

    //const listUsers = this.state.users.map((u) => <li key={u}>{u}</li>)
    const { session } = this.props.location.data // this should be able to happen in didmount and we set a session state var but it doesnt
    const { userID } = this.props.location.data
    const { host } = this.props.location.data
    //Need to add an onclick to set the joinable attribute of this session to false

    if(host) {
      return (
        <div style = {styles.container}>
          <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
          <h1>Movie Picker</h1>
          <h2>Game Pin: {session.pin}</h2>
          <button style = {styles.button} onClick = {() => this.fetchUsers()}>Refresh</button>
          <p style = {styles.smallText}>Reloading this page with the browser's reload button will close the session and bring you back to the home screen. Please use the Refresh button above.</p>
          {/*<p style = {styles.username}>{listUsers}</p>*/}
          {this.state.users.map(userInfo => <div><p style={styles.username}>{userInfo.userNickname}</p></div>)}
          <Link to = {{pathname: '/session', data: {userID, session, host}}} onClick = {this.makeNotJoinable}>
            <StartSessionButton host = {host} canClick = {this.state.nonHostClickDisabled}/>
          </Link>
        </div>
      )
    }
    else {
      return (
        <div style = {styles.container}>
          <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
          <h1>Movie Picker</h1>
          <h2>Game Pin: {session.pin}</h2>
          <button style = {styles.button} onClick = {() => this.fetchUsers()}>Refresh</button>
        {this.state.users.map(userInfo => <div><p style={styles.username}>{userInfo.userNickname}</p></div>)}
          <p>Waiting for host to start session...</p>
          { this.state.redirectToSession ? <Navigate to={{pathname: '/session', data: {userID, session, host}}} /> : null }
        </div>
      )
    }

  }
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  username: { fontSize: 20, fontWeight: 'bold' },
  smallText: { fontSize: 12},
  todoDescription: { marginBottom: 0 },
  button: { outline: 'none', fontSize: 18, padding: '12px 0px', marginBottom: 10  },
  test: { display: 'none'}
}

export default WaitingRoom
