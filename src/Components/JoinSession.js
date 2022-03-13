import React, { Component} from 'react'
import { Link, Navigate} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"

class JoinSession extends Component {
  constructor(props) { // the constructor is required to add state to the component
    super(props)
    this.state = {
      formValue: '',
      btnDisabled: false,
      btnOnClick: false,
      canClick: false,
      session: {},
      userID: '',
      nickname: '',
      redirect: false,
      newUser: '',
      sessionPin: '',
      redirect: false
    }
    this.setInput = this.setInput.bind(this)
    this.alertMessage = this.alertMessage.bind(this)
    this.checkSession = this.checkSession.bind(this)
    this.join = this.join.bind(this)
    this.setNicknameInput = this.setNicknameInput.bind(this)
    this.setPinInput = this.setPinInput.bind(this)
    this.joinSession = this.joinSession.bind(this)
  }

  async onChange2(value) {
    console.log(value)
    // const axios = require('axios').default
    // const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    //   },
    //   body: `secret=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe&response=${value}`
    // })
    // .then(res => res.json())
    // .then(json => json.success)
    // .catch(err => {
    //   throw new Error(`Error in Google Siteverify API. ${err.message}`)
    // })
    // try {
    //   const payload = {
    //     secret: "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe",
    //     response: value,
    //     remoteip: undefined,
    //   };
    //   const verifyResponse = await fetch({
    //     method: "post",
    //     url: "https://www.google.com/recaptcha/api/siteverify",
    //     params: payload,
    //   });
    //   console.log(verifyResponse)
    //   if (verifyResponse.data.success) {
    //     console.log("success")
    //   }
    //   else {
    //     throw new Error("Recaptcha verification failed");
    //   }
    // }
    // catch (error) {
    //   console.error(error);
    //   throw error;
    // }
  }

  setInput(e) {
    this.setState({ // should not be using async and await there
     formValue: e.target.value
    })
    if(e.target.value.length < 9) { // need to change this to see when it is actually enabled
      this.setState({
        btnDisabled: true,
        btnOnClick: false
      })
    }
    else {
      this.checkSession()
    }
  }

  setPinInput(value) {
    this.setState({
      sessionPin: value
    })
  }

  setNicknameInput(value) {
    this.setState({
      nickname: value
    })
  }

  alertMessage(message) {
    alert(message)
    console.log(message)
  }

  async joinSession() {
    try {
      var sessionToJoinID;
      var users;
      var joinable;
      // await API.graphql({ query: listSessions, variables: {filter: {pin: {eq: this.state.sessionPin}}}}).then(response => {
      //   sessionToJoinID = response.data.listSessions.items[0].id
      //   users = response.data.listSessions.items[0].joinedUsers
      //   joinable = response.data.listSessions.items[0].joinable
      //   if(joinable) {
      //     API.graphql({ query: createUser, variables: {input: {currentSession: sessionToJoinID, nickname: this.state.nickname}}}).then(response2 => {
      //       users.push({userID: response2.data.createUser.id, userNickname: this.state.nickname})
      //       API.graphql({ query: updateSession, variables: {input: {id: sessionToJoinID, joinedUsers: users}}}).then(response3 => {
      //         this.setState({
      //           userID: response2.data.createUser.id,
      //           redirect: true,
      //           session: response3.data.updateSession
      //         })
      //       })
      //     })
      //   }
      //   else
      //     throw 'Session is no longer joinable'
      // })
    }
    catch (err) {
      if(err == 'Session is no longer joinable')
        alert("Session is no longer joinable.")
      else
        alert('Session not found.')
      this.setState({
        btnDisabled: false // the bool value is confusing but it works for the disjuction on the disabled property of the button
      })
    }
  }

  checkSession() {
    try {
      if(!this.state.formValue)
        throw 'No value inputted.' // shouldn't happen
      const gamePin = this.state.formValue
      // API.graphql({ query: listSessions, variables: {filter: {pin: {eq: gamePin}}}}).then(response => {
      //   if(response.data.listSessions.items.length === 1 && response.data.listSessions.items[0].joinable) {
      //     API.graphql({ query: createUser, variables: {input: {currentSession: response.data.listSessions.items[0].id, nickname: this.state.nickname}}}).then(response2 => {
      //       const createdUserID = response2.data.createUser.id
      //       this.setState({
      //         userID: createdUserID,
      //         newUser: response2.data.createUser
      //       })
      //     })
      //     this.setState({
      //       canClick: true,
      //       btnDisabled: false,
      //       btnOnClick: true,
      //       session: response.data.listSessions.items[0]
      //     })
      //   }
      //   else {
      //     this.setState({
      //       canClick: false,
      //       btnDisabled: false,
      //       btnOnClick: false,
      //     })
      //   }
      // })
    }
    catch (err) {}
  }

  join = (sessionToJoin, userToJoin) => {
    try {
      var sessionId = sessionToJoin.id
      var userList = sessionToJoin.joinedUsers
      userList.push(userToJoin)
      //API.graphql({ query: updateSession, variables: {input: {id: sessionId, joinedUsers: userList}}})
      this.setState({
        redirect: true
      })
    }
    catch (err) {
      console.log('Error joining session:', err)
      this.setState({
        formValue: ''
      })
    }
  }
  _onClick = (event) => {
    event.preventDefault()
  }

  render() {
    if(this.state.redirect) {
      return (
        <Navigate to = {{pathname: '/waitingRoom', data: {userID: this.state.userID, session: this.state.session, host: false}}} />
      )
    }
    else {
      return (
        <div style = {styles.container}>
          <h1>Movie Picker</h1>
          <h2>Join a Session</h2>
          <input
            id = "testID"
            onChange = {(event) => this.setPinInput(event.target.value)}
            style = {styles.input}
            value = {this.state.sessionPin}
            placeholder = "123abc"
            maxLength = "8"
            autoFocus
          /> {/* maybe change "onChange" to be when you press enter, not when any change happens*/}
          <input
            onChange = {event => {this.setNicknameInput(event.target.value)}}
            style = {styles.input}
            value = {this.state.nickname}
            placeholder = "Enter a nickname..."
          />
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange = {event => {this.onChange2(event)}}
          />
          {/*<Link to = {{pathname: '/session', data: {userID: this.state.userID, session: this.state.session}}} onClick = {this.state.canClick ? null : event => this._onClick(event)}>*/}
          <button
            style = {styles.button}
             disabled = {this.state.sessionPin.length < 8 || this.state.nickname == '' || this.state.btnDisabled}
             onClick = {() => {this.joinSession()}}>
             Join
           </button>
        </div>
      )
    }

  }
}

export default JoinSession
//export default withAuthenticator(JoinSession)

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { outline: 'none', fontSize: 18, padding: '12px 0px', width: '100%' }
}



// const initialValue = ''
//
// const initialBtn = {disabled: true, onClick: ''}
//
// const initialLink = {linkStyle: { pointerEvents: 'none'}}
//
//
// const JoinSession = () => {
//   const [formValue, setFormValue] = useState(initialValue)
//   const [btnState, setBtnState] = useState(initialBtn)
//   const [linkState, setLinkState] = useState(initialLink)
//
//   function setInput(value) {
//     setFormValue(value)
//     if(value.length <= 8)
//       setBtnState(initialBtn)
//     else {
//       //console.log(linkState)
//       checkSession()
//       //console.log(btnState)
//       //console.log(linkState)
//       // here, we can check if this session exists (before they click join). If it does not, disable default behaviour of link and set the onClick of
//       //  button to a function that displays an alert. If it does, make the onClick of link be '' and the onClick of button to join
//     }
//     //console.log(linkState)
//     //console.log(btnState)
//   }
//
//   function alertMessage(message) {
//     alert(message)
//     console.log(message)
//   }
//
//   async function checkSession() {
//     try {
//       if(!formValue)
//         throw 'No value inputted.' // shouldn't happen
//       const gamePin = formValue
//       console.log(gamePin)
//       var queryReturn = await API.graphql({ query: listSessions, variables: {filter: {pin: {eq: gamePin}}}}).then(response => {
//         console.log(queryReturn)
//         if(typeof response.data.listSessions !== undefined) {
//           console.log("in first if")
//           if(response.data.listSessions.items.length === 1) {
//             setLinkState({linkStyle: {pointerEvents: 'auto'}})
//             setBtnState({disabled: false, onClick: 'join()'})
//           }
//         }
//         else {
//           setLinkState(initialLink)
//           setBtnState({disabled: false, onClick: "alertMessage('Session not found')"})
//         }
//       })
//     } catch (err) {}
//   }
//
//   async function join() {
//     try {
//       const gamePin = formValue
//       var queryReturn = await API.graphql({ query: listSessions, variables: {filter: {pin: {eq: gamePin}}}})
//       var createdReturn = await API.graphql({ query: createUser, variables: {input: {}}})
//       var sessionId = queryReturn.data.listSessions.items[0].id
//       var userList = queryReturn.data.listSessions.items[0].joinedUsers
//       if(!userList)
//         userList = [createdReturn.data.createUser.id]
//       else
//         userList = userList.push(createdReturn.data.createUser.id)
//       await API.graphql({ query: updateSession, variables: {input: {id: sessionId, joinedUsers: userList}}})
//     } catch (err) {
//         console.log('Error joining session:', err)
//         setFormValue(initialValue)
//       }
//   }
//
//   return (
//     <div style = {styles.container}>
//       <h1>Movie Picker</h1>
//       <h2>Join a Session</h2>
//       <input
//         onChange = {event => setInput(event.target.value)}
//         style = {styles.input}
//         value = {formValue}
//         placeholder = "123abc"
//       /> {/* maybe change "onChange" to be when you press enter, not when any change happens*/}
//       <Link to = '/session' style = {initialLink.linkStyle}>
//         <button disabled={btnState.disabled} onClick = {() => btnState.onClick} style = {styles.button}>Join</button>
//       </Link>
//
//     </div>
//   )
//
// }
//
// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   button: { outline: 'none', fontSize: 18, padding: '12px 0px', width: '100%' }
// }
