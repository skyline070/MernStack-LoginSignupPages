import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/profile'); // Redirect to Profile
        } catch (err) {
            alert(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
            <p className={styles.registerPrompt}>
                Don't have an account?{' '}
                <span onClick={() => navigate('/register')} className={styles.link}>
                    Register
                </span>
            </p>
        </div>
    );
};

export default Login;
