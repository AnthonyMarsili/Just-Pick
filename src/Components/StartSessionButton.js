import React, { Component} from 'react'

class StartSessionButton extends Component {
  constructor(props) { // the constructor is required to add state to the component
    super(props)
    this.state = {
    }
  }

    render() {
      console.log(this.props.host)
      if(this.props.host) {
        return (
          <div style = {styles.container}>
            <button style = {styles.button}>Start Session</button>
          </div>
        )
      }
      else {
        return (
          <div style = {styles.container}>
            <p>Waiting for user to start session...</p>
            <button style = {styles.button} disabled = {this.props.canClick}>Join</button>
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
  todoDescription: { marginBottom: 0 },
  button: { outline: 'none', fontSize: 18, padding: '12px 0px', marginBottom: 10  },
  test: { display: 'none'}
}

export default StartSessionButton
