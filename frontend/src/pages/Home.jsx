import Button from '../components/UI/Button';

const Home = ({ onNavigate }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">CSS Parking Igrica</h1>
            <p className="text-lg mb-8 text-center max-w-lg">
                Naučite CSS transformacije na zabavan način. Parkirajte auto koristeći pravi CSS kod!
            </p>
            <div className="flex space-x-4">
                <Button onClick={() => onNavigate('level-select')} className="bg-blue-500 text-white">
                    Počni igru
                </Button>
                <Button onClick={() => onNavigate('admin')} className="bg-gray-500 text-white">
                    Admin panel
                </Button>
            </div>
        </div>
    );
};

export default Home;