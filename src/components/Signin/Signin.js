import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button'
import './Signin.css'

const Signin = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className='signin-main-page'>
      <div className='signin-container'>
        <div className='signin-leftside'>
          <p>Sign in</p>
          <Form>
            <div className='form-field'>
              <label> Email: </label>
              <input type='email'
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e)} />
            </div>
            <div className='form-field'>
              <label> Password:</label>
              <input type='password'
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)} />
            </div>
            <div className='signin-button'>
              <Button variant="primary" onClick={handleSubmit} type='submit'>Sign in</Button>
            </div>
          </Form>
        </div>
        <div className='signin-rightside'>
          <p className='signin-welcome'>Let's Log in to get you started!</p>
          <p className='signin-desc'>Incididunt ut aliquip voluptate ea velit ullamco. Fugiat mollit eiusmod ut eiusmod.</p>
        </div>
      </div>
    </div>
  )
}

export default Signin
