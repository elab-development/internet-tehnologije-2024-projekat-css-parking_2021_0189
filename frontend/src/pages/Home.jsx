import Button from '../components/UI/Button';
import { FaCar } from 'react-icons/fa';
const Home = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom">
      
      
      <div className="mb-6 animate-bounce-slow">
        {/* logo <img src="/path/to/logo.svg" alt="Logo" /> */}
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
          onClick={() => onNavigate('login')}
          className="w-full py-5 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
        >
          <span>Login</span>
        </Button>
        <Button
          onClick={() => onNavigate('register')}
          className="w-full py-5 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
        >
          <span>Registruj se</span>
        </Button>
        <Button
          onClick={() => onNavigate('guest')}
          className="w-full py-5 text-lg bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all"
        >
          Nastavi kao gost
        </Button>
      </div>
    </div>
  );
};

export default Home;