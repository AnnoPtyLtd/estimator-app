import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Signup.css'

const Signup = () => {

    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "fullName") {
            setFullName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                }),
            });

            if (response.status === 200) {
                // Successful registration
                alert("User registered successfully");
                navigate('/signin');

            } else {
                alert("User registration failed");
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const handleSignIn = () => {
        navigate('/signin')
    }

    return (
        <div className='signup-main-page'>
            <div className='signup-container'>
                <div className='signup-leftside'>
                    <p className='signup-welcome'>Welcome to Signup Page</p>
                    <p className='signup-desc'>Incididunt ut aliquip voluptate ea velit ullamco. Fugiat mollit eiusmod ut eiusmod.</p>
                </div>
                <div className='signup-rightside'>
                    <p>Create an Account</p>
                    <Form action=''>
                        <div className='form-field'>
                            <label> Full Name:</label>
                            <input type='text'
                                id="fullName"
                                value={fullName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Email: </label>
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
                        <div className='form-field'>
                            <label> Confirm Password:</label>
                            <input type='password'
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className='form-checkbox'>
                            <Form.Check
                                type="checkbox"
                                label="I agree to the terms and conditions"
                                id="checkbox-id"/>
                        </div>
                        <div className='signup-button'>
                            <Button variant="primary" onClick={handleSubmit} type='submit'>Sign Up</Button>
                        </div>
                        <div className='signin-button-div'>
                            <p>Already registered?</p>
                            <Button variant="primary" onClick={handleSignIn}>Sign In</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signup
