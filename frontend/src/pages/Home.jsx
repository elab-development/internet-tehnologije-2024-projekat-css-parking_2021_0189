import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { FaCar } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom">
      
      <div className="mb-6 animate-bounce-slow">
        <FaCar className="text-blue-600 text-8xl" />
      </div>

      <h1 className="text-6xl font-extrabold mb-4 text-blue-800 animate-fade-in-down">
        CSS Parking
      </h1>
      
      <p className="text-xl mb-12 max-w-xl text-gray-700 animate-fade-in">
        Pretvori se u vozača i nauči <strong className="text-blue-600">CSS transformacije</strong>!<br />
        Precizno upravljaj automobilom koristeći svoje CSS veštine.
      </p>
      
      <div className="flex flex-col gap-6 w-full max-w-sm justify-center">
        <Button
          onClick={() => navigate('/login')}
          className="login"
        >
          <span>Login</span>
        </Button>
        <Button
          onClick={() => navigate('/register')}
          className="register"
        >
          <span>Registruj se</span>
        </Button>
        <Button
          onClick={() => navigate('/guest')}
          className="guest"
        >
          Nastavi kao gost
        </Button>
      </div>
    </div>
  );
};

export default Home;