import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = ({ darkMode, toggleDarkMode }) => {
  // Icons
  const HomeIcon = getIcon('Home');
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const DotIcon = getIcon('CircleDot');

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-gradient-to-br from-primary to-secondary h-9 w-9 md:h-10 md:w-10 rounded-lg">
              <span className="text-white text-xl md:text-2xl font-bold">D</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DotNexus
            </h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 md:w-6 md:h-6 text-surface-400" />
            ) : (
              <MoonIcon className="w-5 h-5 md:w-6 md:h-6 text-surface-600" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-8 relative">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full mx-2 md:mx-3 ${
                  i === 0 ? 'bg-primary' : 
                  i === 1 ? 'bg-secondary' : 
                  i === 2 ? 'bg-accent' : 
                  'bg-surface-400 dark:bg-surface-600'
                }`}
              />
            ))}
            
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ 
                opacity: 1, 
                pathLength: 1,
                transition: { delay: 0.6, duration: 0.8 }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-40 h-4"
            >
              <svg viewBox="0 0 100 10" className="w-full h-full">
                <motion.path
                  d="M0,5 L100,5"
                  fill="none"
                  stroke={darkMode ? "#94a3b8" : "#64748b"}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                404
              </span> | Page Not Found
            </h2>
            
            <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
              Oops! Looks like these dots don't connect. The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <HomeIcon className="w-5 h-5" />
              <span>Return Home</span>
            </Link>
          </motion.div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
          <p>© 2024 DotNexus. Connect the dots. Challenge your mind.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;