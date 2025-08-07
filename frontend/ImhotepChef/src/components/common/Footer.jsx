import { Link } from 'react-router-dom';
import ImhotepChefLogo from '../../assets/ImhotepChef.png';

function Footer() {
    return (
        <footer className="relative z-10 py-12 bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center">
                <div className="flex justify-center mb-4">
                    <img 
                        src={ImhotepChefLogo} 
                        alt="ImhotepChef Logo" 
                        className="w-12 h-12 object-contain"
                    />
                </div>
                <h3 className="text-2xl font-bold mb-2">Imhotep Chef</h3>
                <p className="text-gray-400 mb-6">Your AI-Powered Culinary Companion</p>
                
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                    <Link to="https://imhoteptech.vercel.app/" className="hover:text-orange-400 transition-colors">Imhotep Tech</Link>
                    <Link to="https://github.com/Imhotep-Tech/ImhotepChef" className="hover:text-orange-400 transition-colors" target="_blank" rel="noopener noreferrer">Source Code</Link>
                    <Link to="/download" className="hover:text-orange-400 transition-colors">Download</Link>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <p className="text-gray-500">&copy; 2025 Imhotep Chef. All rights reserved.</p>
                </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer