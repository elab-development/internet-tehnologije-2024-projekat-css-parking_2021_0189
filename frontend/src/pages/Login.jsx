import { FaCar } from 'react-icons/fa';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      const result = await login(email, password);
      
      if (result.success) {
          navigate('/dashboard');
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

      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-full mb-4 transition-all duration-300">
            {error}
          </div>
        )}

      <form 
      onSubmit={handleLogin}
      className="flex flex-col gap-6 w-full max-w-sm">
        <InputField
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
        className="login" 
        type="submit"
        disabled={loading}
        >
          <span>{loading ? 'Prijava...' : 'Prijavi se'}</span>
        </Button>

      </form>
      <p className="mt-4 text-gray-700">
        Nemaš nalog?{' '}
        <button onClick={() => navigate('/register')} className="text-blue-600 hover:underline">
          Registruj se
        </button>
      </p>
    </div>
  );
};

export default Login;