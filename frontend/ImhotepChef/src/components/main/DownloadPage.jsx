import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePWA } from '../../hooks/usePWA';
import ImhotepChefLogo from '../../assets/ImhotepChef.png';
import Footer from '../common/Footer';

const DownloadPage = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      setDeviceType('android');
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDeviceType('ios');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await installApp();
    }
  };

  const getInstallInstructions = () => {
    switch (deviceType) {
      case 'android':
        return {
          steps: [
            { step: 1, text: 'Open ImhotepChef in Chrome browser', icon: '🌐' },
            { step: 2, text: 'Tap the menu button (⋮) in the top right corner', icon: '⋮' },
            { step: 3, text: 'Select "Add to Home screen" or "Install app"', icon: '📱' },
            { step: 4, text: 'Tap "Add" or "Install" to confirm', icon: '✅' },
            { step: 5, text: 'The app icon will appear on your home screen', icon: '🏠' }
          ],
          icon: '🤖',
          browserNote: 'Works best with Chrome on Android devices'
        };
      case 'ios':
        return {
          steps: [
            { step: 1, text: 'Open ImhotepChef in Safari browser', icon: '🧭' },
            { step: 2, text: 'Tap the Share button (□↑) at the bottom', icon: '📤' },
            { step: 3, text: 'Scroll down and tap "Add to Home Screen"', icon: '➕' },
            { step: 4, text: 'Tap "Add" in the top right corner', icon: '✨' },
            { step: 5, text: 'The app will appear on your home screen', icon: '🍎' }
          ],
          icon: '📱',
          browserNote: 'Requires Safari browser on iOS devices'
        };
      default:
        return {
          steps: [
            { step: 1, text: 'Open ImhotepChef in Chrome, Edge, or Firefox', icon: '💻' },
            { step: 2, text: 'Look for the install icon in the address bar', icon: '⬇️' },
            { step: 3, text: 'Click the install button when it appears', icon: '🖱️' },
            { step: 4, text: 'Click "Install" in the confirmation dialog', icon: '✅' },
            { step: 5, text: 'The app will be added to your applications', icon: '🚀' }
          ],
          icon: '💻',
          browserNote: 'Supported in Chrome, Edge, and Firefox browsers'
        };
    }
  };

  const instructions = getInstallInstructions();

  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Instant loading and smooth performance, even on slow connections'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Perfect touch experience designed specifically for mobile devices'
    },
    {
      icon: '🔄',
      title: 'Offline Access',
      description: 'Browse your saved recipes even when you\'re not connected to the internet'
    },
    {
      icon: '💾',
      title: 'Auto Updates',
      description: 'Always get the latest features automatically in the background'
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'Get notified about new recipe suggestions and cooking tips'
    },
    {
      icon: '�',
      title: 'Native Feel',
      description: 'App-like experience that feels natural on your device'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-pink-200 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo with installation badge */}
            <div className="relative inline-block mb-8">
              <div className="chef-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-orange-100">
                <img 
                  src={ImhotepChefLogo} 
                  alt="ImhotepChef" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto"
                />
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  PWA ✨
                </div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Download <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">ImhotepChef</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get the full app experience with offline access, push notifications, and lightning-fast performance
            </p>

            {/* Install Status & Button */}
            <div className="mb-16">
              {isInstalled ? (
                <div className="chef-card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-3 text-green-800">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <div className="font-bold text-lg">App Already Installed!</div>
                      <div className="text-sm opacity-90">You can access it from your home screen</div>
                    </div>
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="space-y-4">
                  <button
                    onClick={handleInstallClick}
                    className="chef-button bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">⬇️</span>
                      <span>Install App Now</span>
                    </span>
                  </button>
                  <p className="text-gray-600 text-sm">
                    One-click installation • No app store required
                  </p>
                </div>
              ) : (
                <div className="chef-card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-3 text-blue-800">
                    <span className="text-2xl">📋</span>
                    <div>
                      <div className="font-bold text-lg">Manual Installation</div>
                      <div className="text-sm opacity-90">Follow the guide below to install</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Install the <span className="text-orange-600">ImhotepChef</span> App?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience all the benefits of a native mobile app without visiting the app store
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="chef-card bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-8xl mb-6">{instructions.icon}</div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Install on {deviceType === 'ios' ? 'iPhone/iPad' : deviceType === 'android' ? 'Android' : 'Desktop'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                Follow these simple steps to add ImhotepChef to your device
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>💡</span>
                <span>{instructions.browserNote}</span>
              </div>
            </div>

            <div className="chef-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Step-by-Step Installation Guide
              </h3>
              
              <div className="space-y-6">
                {instructions.steps.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-lg font-semibold text-gray-900">{item.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alternative Methods */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center space-x-2">
                  <span>🔧</span>
                  <span>Alternative Installation Methods</span>
                </h4>
                <div className="space-y-2 text-blue-800">
                  {deviceType === 'android' && (
                    <p className="text-sm">• You can also use the "Install" notification that may appear at the bottom of your screen</p>
                  )}
                  {deviceType === 'ios' && (
                    <p className="text-sm">• Make sure you're using Safari browser for the best installation experience</p>
                  )}
                  {deviceType === 'desktop' && (
                    <div className="text-sm space-y-1">
                      <p>• Look for the install icon (⊕) in your browser's address bar</p>
                      <p>• You may see an install banner at the top of the page</p>
                      <p>• Check your browser's menu for "Install ImhotepChef" option</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of home cooks who have transformed their kitchen experience with ImhotepChef
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="chef-button bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Get Started Free
            </Link>
            
            <Link
              to="/"
              className="chef-button-secondary bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DownloadPage;
