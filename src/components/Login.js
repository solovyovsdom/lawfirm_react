import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    

    async function handleSubmit(e) {
        
        e.preventDefault()
        

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/');
            
        } catch {
            setError("The username or password were incorrect. Please try again with the correct credentials")
        }

        setLoading(false)
    }

    return (

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mt-2">Log In</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                        <div className="w-100 text-center mt-3">
                            <NavLink to="/forgot-password">Forgot Password?</NavLink>
                        </div>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <NavLink to="/signup">Sign up here</NavLink>
            </div>
        </>
    )
}
