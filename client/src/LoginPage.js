import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorData, setErrorData] = useState([])
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/login', {
                username: username,
                password: password
            })
            setUser(response.data)
            setUsername("");
            setPassword("");
            navigate("/posts")

        } catch (error) {
            setErrorData(error.response.data.errors || "An error occurred");
        }
    }

    const handleSwitch = () => {
        navigate("/signup")
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
            <Card style={{ width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="event">
                <Card.Text style={{ color: '#007bff', textAlign: 'center' }}>Become a member</Card.Text>
                <Button variant="secondary" size="sm" onClick={handleSwitch} style={{ marginBottom: '10px', width: '100%' }}>Signup</Button>
                <Card.Title style={{ textAlign: 'center' }}>Login</Card.Title>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} className="form-control" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-control" />
                    </div>
                    <Button variant="secondary" size="sm" type="submit" style={{ width: '100%' }}>Login</Button>
                    {errorData.length > 0 ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}>
                        {errorData.map((error, i) => <li key={i}>{error}</li>)}
                    </ul> : null}
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;