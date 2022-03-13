import React, { Component} from 'react'
import { Link, Navigate} from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown';

const initialPlatforms = []
const initialMatches = 0

class HostSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      platformOptions: [{name: 'Netflix'}, {name: 'Disney+'}],
      platforms: [],
      numOfMatches: 0,
      session: {joinedUsers: []},
      userID: '',
      movies: [],
      redirect: false,
      btnDisabled: false,
      nickname: '',
      username: '',
      password: ''
    }

    this.setPlatformInput = this.setPlatformInput.bind(this)
    this.setNumOfMatchesInput = this.setNumOfMatchesInput.bind(this)
    this.myOnClick = this.myOnClick.bind(this)
    this.addSession = this.addSession.bind(this)
    this.removePlatformInput = this.removePlatformInput.bind(this)
    this.setNicknameInput = this.setNicknameInput.bind(this)
  }

  setPlatformInput(selectedList, selectedItem) {
    var platforms = this.state.platforms
    platforms.push(selectedItem.name) // maybe use concat?
    this.setState({
      platforms: platforms,
    })
  }

  removePlatformInput(selectedList, removedItem) {
    var platforms = this.state.platforms
    platforms.splice(platforms.indexOf(removedItem.name), 1)
    this.setState({
      platforms: platforms,
    })
  }

  setNumOfMatchesInput(value) {
    this.setState({
      numOfMatches: value
    })
  }

  setNicknameInput(value) {
    this.setState({
      nickname: value
    })
  }

  myOnClick(event) {
    event.preventDefault()
  }

  async addSession() {
    try {
      this.setState({
        btnDisabled: true
      })
      console.log("creating session");
      var session = {platforms: this.state.platforms, maxMatches: this.state.numOfMatches, matches: [], yesDict: [], version: 0, joinable: true}
      // make the form state be the inital state
      //var createdReturn = await API.graphql({ query: createSession, variables: {input: session}})
      //var createdId = createdReturn.data.createSession.id
      //setSession(createdReturn.data.createSession)
      //var gamePin = createdId.slice(0,8)
      //var listMoviesReturn = await API.graphql({ query: listMovies, variables: {filter: {platform: {eq: platform1}}}})
      //console.log(listMoviesReturn.data.listMovies)
      //await API.graphql({ query: updateSession, variables: {input: {id: createdId, pin: gamePin}}})
      //var createdUserReturn = await API.graphql({ query: createUser, variables: {input: {currentSession: createdId, nickname: this.state.nickname}}})
      //const createdUserID = createdUserReturn.data.createUser.id
      //const userList = [{userID: createdUserID, userNickname: this.state.nickname}]
      //var updatedReturn = await API.graphql({ query: updateSession, variables: {input: {id: createdId, joinedUsers: userList}}})

      this.setState({
        platforms: [], // dont't know if i need this or the next line
        numOfMatches: 0,
        //userID: createdUserID,
        //nickname: createdUserNickname,
        //session: updatedReturn.data.updateSession,
        redirect: true
      })
    }
    catch (err) {
      console.log('error creating session:', err)
      this.setState({
        btnDisabled: false
      })
    }
  }

  render() {
    if(this.state.redirect) {
      return (
        <Navigate to = {{pathname: '/waitingRoom', data: {userID: this.state.userID, session: this.state.session, host: true}}}/>
      )
    }
    else {
      return (
        <div style = {styles.container}>
          <h1>Movie Picker</h1>
          <h2>Host a Session</h2>
          <Multiselect
            style = {multiselectStyles}
            options = {this.state.platformOptions}
            displayValue = "name"
            onSelect = {this.setPlatformInput}
            onRemove = {this.removePlatformInput}
            placeholder = "Select your platforms..."
            />
          <input
            onChange = {event => {this.setNumOfMatchesInput(event.target.value)}}
            style = {styles.input}
            //value = {this.state.numOfMatches}
            placeholder = "Enter a max number of matches..."
          />
          <input
            onChange = {event => {this.setNicknameInput(event.target.value)}}
            style = {styles.input}
            value = {this.state.nickName}
            placeholder = "Enter a nickname..."
          />
          <button
            style = {styles.button}
             disabled = {this.state.platforms.length == 0 || this.state.numOfMatches == 0 || this.state.nickname == '' || this.state.btnDisabled}
             onClick = {() => {this.addSession()}}>
             Create Session
           </button>

        </div>
      )
    }
  }
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: '1px solid #cccccc', borderRadius: '4px', backgroundColor: 'white', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { outline: 'none', fontSize: 18, padding: '12px 0px', width: '100%', marginBottom: 5 }
}

const multiselectStyles = {
  multiselectContainer: { // To change css for multiselect (Width,height,etc..)
    marginBottom: 10
  },
  searchBox: { // To change search box element look
  	minHeight: '30px',
    padding: '8px'
  },
  inputField: { // To change input field position or margin
    fontSize: '18px',
  },
  chips: { // To change css chips(Selected options)
	   background: 'red'
  },
  optionContainer: { // To change css for option container
	   border: '2px solid'
  },
  option: { // To change css for dropdown options
	   color: 'blue'
  }
}

export default HostSession
//export default withAuthenticator(HostSession)

// const HostSession = () => {
//   const [platforms, setPlatforms] = useState(initialPlatforms)
//   const [numOfMatches, setNumOfMatches] = useState(initialMatches)
//   const [session, setSession] = useState({joinedUsers: []})
//   const [userID, setUserID] = useState('')
//   const [btnDisabled, setBtnDisabled] = useState(true)
//   const [movies, setMovies] = useState([])
//   const [host, setHost] = useState(true)
//
//   // when we switch to this being a class component (consistency, despite no props), use a form like below
//   // <form onSubmit={this.handleSubmit}>
//   //   <label>Choose a platform:</label>
//   //   <select value = {this.state.chosenPlatform} onChange = {this.handleDropdownChange}>
//   //     <option value = 'netflix'>Netflix</option>
//   //     <option value = 'disney'>Disney+</option>
//   //   </select>
//   // </form>
//
//   function setPlatformInput(value) {
//     setBtnDisabled(true)
//     platforms.push(value) // maybe use concat?
//     setPlatforms(platforms)
//   }
//
//   function setNumOfMatchesInput(value) {
//     setBtnDisabled(true)
//     setNumOfMatches(value)
//   }
//
//   function myOnClick(event) {
//     event.preventDefault()
//   }
//
//   async function addSession() {
//     try {
//       console.log("hello")
//       if (platforms.length === 0 || numOfMatches === 0)
//         return
//       var session = {platforms: platforms, maxMatches: numOfMatches, matches: [], yesDict: [], version: 0, joinable: true}
//       setPlatforms(initialPlatforms) // make the form state be the inital state
//       setNumOfMatches(initialMatches)
//       var createdReturn = await API.graphql({ query: createSession, variables: {input: session}})
//       var createdId = createdReturn.data.createSession.id
//       //setSession(createdReturn.data.createSession)
//       var gamePin = createdId.slice(0,8)
//       //var listMoviesReturn = await API.graphql({ query: listMovies, variables: {filter: {platform: {eq: platform1}}}})
//       //console.log(listMoviesReturn.data.listMovies)
//       await API.graphql({ query: updateSession, variables: {input: {id: createdId, pin: gamePin}}})
//       var createdUserReturn = await API.graphql({ query: createUser, variables: {input: {currentSession: createdId}}})
//       const createdUserID = createdUserReturn.data.createUser.id
//       setUserID(createdUserID)
//       const userList = [createdUserID]
//       var updatedReturn = await API.graphql({ query: updateSession, variables: {input: {id: createdId, joinedUsers: userList}}})
//       setSession(updatedReturn.data.updateSession)
//       setBtnDisabled(false)
//     } catch (err) { console.log('error creating session:', err) }
//   }
//
//   return (
//     <div style = {styles.container}>
//       <h1>Movie Picker</h1>
//       <h2>Host a Session</h2>
//       <input
//         onBlur = {event => setPlatformInput(event.target.value)}
//         style = {styles.input}
//         //value = {platforms[0]}
//         placeholder = "Enter a platform..."
//       />
//       <input
//         onChange = {event => setNumOfMatchesInput(event.target.value)}
//         style = {styles.input}
//         //value = {numOfMatches}
//         placeholder = "Enter a max number of matches..."
//       />
//       <button style = {styles.button} onClick = {addSession}>Create Session</button>
//       {/*}<Link to = {{pathname: '/session', data: {userID, session}}} onClick = {btnDisabled ? event => myOnClick(event) : null}>*/}
//       <Link to = {{pathname: '/waitingRoom', data: {userID, session, host}}} onClick = {btnDisabled ? event => myOnClick(event) : null}>
//         <button disabled = {btnDisabled} style = {styles.button}>Go to Waiting Room</button>
//         {/*}<button disabled = {btnDisabled} style = {styles.button}>Start</button>*/} {/* add a onClick = {createSession} to  button, using the value formState*/}
//       </Link>
//     </div>
//   )
// }
//
// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   button: { outline: 'none', fontSize: 18, padding: '12px 0px', width: '100%', marginBottom: 5 }
// }
//
// export default HostSession
