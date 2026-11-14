import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/authService';

export default function SignIn() {
    const navigate = useNavigate();
    const { login: saveSession } = useAuth();
    const formRef = useRef(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            email: formRef.current.elements.email.value,
            password: formRef.current.elements.password.value,
        };
        try {
            const { accessToken } = await login(credentials);
            saveSession(accessToken);
            navigate('/dashboard', { replace: true });
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            {error && <p>{error}</p>}
            <button type="submit">Sign in</button>
        </form>
    );
}
