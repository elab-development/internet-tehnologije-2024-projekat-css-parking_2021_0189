import { FaCar } from 'react-icons/fa';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    //console.log('Login attempt:', { email, password });
    // Ovde bi bila logika za prijavu
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom">
      <div className="mb-6">
        <FaCar className="text-blue-600 text-8xl" />
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full max-w-sm">
        <InputField
          type="email"
          placeholder="Email adresa"
          //value={email}
          //onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Lozinka"
          //value={password}
          //onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="login" type="submit">
          <span>Prijavi se</span>
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