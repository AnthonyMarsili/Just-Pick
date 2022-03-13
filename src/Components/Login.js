import React, { useState, useEffect } from 'react'

const initialForm = {phoneNumber: '', authCode: '', agree: true, formType: 'askForPhone'}

function Login() {
  const [form, updateForm] = useState(initialForm)

  function onChange(e) {
    e.persist() // idk, from tutorial
    updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
  }

  function onChange2(value) {
    console.log(value)
  }

  async function signUp() {
    const username = '+1' + form['phoneNumber']
    const password = 'justPickDefault'
    const email = 'defaultPickDefault@email.com'



    //await Auth.signUp({ username, password, attributes: {'email': email}} )
    console.log("signed up user")
    updateForm(() => ({ ...form, formType: 'confirmSignUp' }))
  }

  async function confirmSignUp() {
    const username = form['phoneNumber']
    const authCode = form['authCode']
    //await Auth.confirmSignUp(username, authCode)
    console.log("confirmed user")
    updateForm(() => ({ ...form, formType: 'joinOrHost' }))
  }

  const { formType } = form

  return (
    <div style = {styles.container}>
      {
        formType === 'askForPhone' && (
          <div>
            <h2>Please input your phone number</h2>
            <input name = 'phoneNumber' onChange = {onChange} placeholder = '5555555555' />
            <button onClick = {() => signUp()} style = {styles.button}>Sign Up</button>
            {/* <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange = {onChange2}
            /> */}
          </div>
        )
      }
      {
        formType === 'confirmSignUp' && (
          <div>
            <h2>Hello! Enter the code that was sent to your phone.</h2>
            <input name = 'authCode' onChange = {onChange} placeholder = 'Code' />
            <button onClick = {() => confirmSignUp()} style = {styles.button}>Confirm</button>
          </div>
        )
      }
      {
        formType === 'joinOrHost' && (
          <div>
            <h2>This would be a redirect to join or hsot session.</h2>
            <h3>They now have access to the db</h3>
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

export default Login
