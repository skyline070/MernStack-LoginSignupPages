import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/register', formData);
            console.log(res);
            if (res.data.status === 200) {
                alert('Registration successful! Please log in.');
                navigate('/login'); // Redirect to Login after registration
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Error registering');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={styles.input}
                />
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
                    Register
                </button>
            </form>
            <p className={styles.loginPrompt}>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className={styles.link}>
                    Login
                </button>
            </p>
        </div>
    );
};

export default Register;
