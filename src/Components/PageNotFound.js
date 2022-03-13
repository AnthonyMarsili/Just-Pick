import React from 'react'
import { Link} from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div style = {styles.container}>
      <h1>Movie Picker</h1>
      <h2>Page not found!</h2>
      <p>Click <Link to = '/'>here</Link> to return to the homepage</p>
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default PageNotFound
