// src/components/Login.js
import React, {FormEvent, useState} from 'react';
// import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e : FormEvent) => {
        e.preventDefault();
        try {
            //await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="center-container">
            <form onSubmit={handleLogin} className="login-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
