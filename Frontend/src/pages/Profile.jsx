import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login if not authenticated
                    return;
                }
                console.log(token, 'ine 19')
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `${token}` },
                });
                console.log(response)
                if (response.data.status === 200) {
                    setUserData({
                        username: response.data.data.username,
                        email: response.data.data.email
                    })
                }
            } catch (err) {
                console.log(err)
                // alert('Error fetching profile');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('http://localhost:5000/profile', userData, {
                headers: { Authorization: `${token}` },
            });
            console.log(res, 'ki')
            if (res.data.status === 200) {
                alert('Profile updated successfully!');
                setEditMode(false);
            }
        } catch (err) {
            alert('Error updating profile');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.form}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={userData.username}
                        disabled={!editMode}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        className={styles.input}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={userData.email}
                        disabled={!editMode}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className={styles.input}
                    />
                </label>
                <div className={styles.buttons}>
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)} className={styles.buttonEdit}>
                            Edit
                        </button>
                    ) : (
                        <button onClick={handleUpdate} className={styles.buttonSave}>
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
