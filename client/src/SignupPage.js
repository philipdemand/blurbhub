import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const SignupPage = () => {

    const initialData = {
        username: "",
        password: "",
        password_confirmation: "",
        email: ""
    }

    const [formData, setFormData] = useState(initialData)
    const [errorData, setErrorData] = useState([])
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext)

    const formChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/v1/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            })
            setUser(response.data);
            navigate("/posts")
        } catch (error) {
            setErrorData(error.response.data.errors)
        }
    }

    const handleSwitch = () => {
        navigate("/login")
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Card style={{ width: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="event">
                <Card.Text style={{ color: '#007bff', textAlign: 'center', marginTop: '10px' }}>Already a member?</Card.Text>
                <Button variant="secondary" size="sm" onClick={handleSwitch} style={{ marginBottom: '10px', width: '100%' }}>Login</Button>
                <Card.Title style={{ textAlign: 'center' }}>Sign Up</Card.Title>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={formChange} className="form-control" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={formChange} className="form-control" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="confirmation">Confirm Password:</label>
                        <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={formChange} className="form-control" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="emailaddress">Email Address:</label>
                        <input type="email" name="email" value={formData.email} onChange={formChange} className="form-control" />
                    </div>
                    <Button variant="secondary" size="sm" type="submit" style={{ width: '100%' }}>Sign Up</Button>
                    {errorData.length > 0 ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}>
                        {errorData.map((error, i) => <li key={i}>{error}</li>)}
                    </ul> : null}
                </form>
            </Card>
        </div>
    );
};

export default SignupPage;