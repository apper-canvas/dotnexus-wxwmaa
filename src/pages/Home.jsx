import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = ({ darkMode, toggleDarkMode }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Icons
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const InfoIcon = getIcon('Info');
  const XIcon = getIcon('X');
  
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              initial={{ rotate: -30, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="flex items-center justify-center bg-gradient-to-br from-primary to-secondary h-9 w-9 md:h-10 md:w-10 rounded-lg"
            >
              <span className="text-white text-xl md:text-2xl font-bold">D</span>
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DotNexus
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={toggleInstructions}
              className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="How to play"
            >
              <InfoIcon className="w-5 h-5 md:w-6 md:h-6 text-surface-600 dark:text-surface-400" />
            </button>
            
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
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <MainFeature />
      </main>

      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-4 md:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
          >
            <button
              onClick={toggleInstructions}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
              aria-label="Close instructions"
            >
              <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
            
            <h2 className="text-xl md:text-2xl font-bold mb-4">How to Play DotNexus</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Objective</h3>
                <p className="text-surface-700 dark:text-surface-300">
                  Complete more boxes than your opponent by connecting dots on the grid.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-1">Rules</h3>
                <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Players take turns connecting two adjacent dots with a line.</li>
                  <li>When a player completes a box, they claim it and get another turn.</li>
                  <li>Each completed box is worth one point.</li>
                  <li>The game ends when all possible lines have been drawn.</li>
                  <li>The player with the most boxes wins!</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-1">Strategy Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Avoid drawing the third side of a box unless you can claim multiple boxes in a chain.</li>
                  <li>Sometimes it's better to give your opponent a single box to avoid setting them up for a chain of boxes.</li>
                  <li>Think ahead! Plan your moves to create favorable situations later in the game.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <footer className="bg-white dark:bg-surface-800 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
          <p>© 2024 DotNexus. Connect the dots. Challenge your mind.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;