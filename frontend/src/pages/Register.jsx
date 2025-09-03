import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import { useState } from 'react';
import { FaCar } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('Registracija je uspešna!');
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom">
        <div className="mb-6">
            <FaCar className="text-blue-600 text-8xl" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-blue-600">
            Registracija
        </h1>

        {message && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300">
            {message}
            </div>
        )}

        <form className="flex flex-col gap-4 w-full max-w-sm">
            <InputField
            type="text"
            placeholder="Ime"
            />
            <InputField
            type="email"
            placeholder="Email adresa"
            />
            <InputField
            type="password"
            placeholder="Lozinka"
            />
            <Button
            onClick={handleRegister}
            className="register"
            >
            <span>Registruj se</span>
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