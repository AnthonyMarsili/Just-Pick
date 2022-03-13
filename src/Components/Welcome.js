import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

// This will remain a functional component for now due to its simplicity

const initialForm = {formType: 'chooseType'}

const Welcome = () => {
  const [form, updateForm] = useState(initialForm)

  const { formType } = form

  async function onChange(value) {
    console.log("Captcha value: ", value)
    for(var j = 0; j < 2; j++) {
      var result = [];
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 10; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
      }
      if(j === 0) {
        var username = result.join('')
      }
      else {
        var password = result.join('')
      }
    }
    signUp(username, password, value)
  }

  async function signUp(user, pass, val) {
    console.log(user)
    console.log(pass)
    console.log(val)
    //await Auth.signUp({ username, password, attributes: { 'custom:captchaValue': captchaValue, }})
    console.log("Signed up user")
    updateForm(() => ({ ...form, formType: 'chooseType' }))
  }

  return (
    <div>
    {
      formType === 'recaptchaChallenge' && (
        <div style = {styles.container}>
          <h1>Movie Picker</h1>
          <h2>Welcome! Please prove you are not a robot.</h2>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange = {onChange}
          />
        </div>
      )
    }
    {
      formType === 'chooseType' && (
        <div style = {styles.container}>
          <h1>Movie Picker</h1>
          <h2>Hello, non-robot. What do you want to do today?</h2>
          <Link to = '/joinSession'><button style = {styles.button}>Join Session</button></Link>
          <Link to = '/hostSession'><button style = {styles.button}>Host Session</button></Link>
        </div>
      )
    }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', width: '100%', margin: '0.5em 0', cursor: 'pointer'}
}

export default Welcome
