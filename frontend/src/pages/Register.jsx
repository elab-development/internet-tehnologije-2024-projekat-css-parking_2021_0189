import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import { useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validacija
    if (password !== passwordConfirmation) {
      setError('Lozinke se ne poklapaju');
      return;
    }
    
    if (password.length < 8) {
      setError('Lozinka mora imati najmanje 8 karaktera');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const result = await register({ 
      name, 
      email, 
      password, 
      password_confirmation: passwordConfirmation 
    });
    
    if (result.success) {
      navigate('/levels');
    } else {
      // Prikaz greške
      if (typeof result.message === 'object') {
        const errorMessages = Object.values(result.message).flat().join(' ');
        setError(errorMessages);
      } else {
        setError(result.message);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom">
        <div className="mb-6 cursor-pointer"
        onClick = {() => navigate('/')}
        >
            <FaCar className="text-blue-600 text-8xl" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-blue-600">
            Registracija
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-full mb-4 transition-all duration-300">
            {error}
          </div>
        )}

        <form 
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-full max-w-sm">
            <InputField
            type="text"
            placeholder="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            />
            <InputField
            type="email"
            placeholder="Email adresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            />
            <InputField
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            />
            <InputField
            type="password"
            placeholder="Potvrdi lozinku"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            disabled={loading}
            />
            <Button
            //onClick={handleRegister}
            className="register"
            type="submit"
            disabled={loading}
            >
            <span>{loading ? 'Registracija...' : 'Registruj se'}</span>
            </Button>
            
            <p className="mt-4 text-gray-700">
            Imaš nalog?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">
                Prijavi se
                </button>
            </p>

        </form>
    </div>
  );
};

export default Register;