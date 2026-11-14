import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../services/authService';

export default function SignIn() {
    const navigate = useNavigate();
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
            localStorage.setItem('token', accessToken);
            navigate('/dashboard', { replace: true });
        } catch {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input name="email" type="email" placeholder="Correo" required />
            <input name="password" type="password" placeholder="Contraseña" required />
            {error && <p>{error}</p>}
            <button type="submit">Ingresar</button>
        </form>
    );
}
