import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icons
  const RefreshCwIcon = getIcon('RefreshCw');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  const TrophyIcon = getIcon('Trophy');
  const SettingsIcon = getIcon('Settings');
  
  // Game settings
  const [gridSize, setGridSize] = useState(5); // 5x5 grid (6x6 dots)
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
  const [showSettings, setShowSettings] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'finished'
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [availableSizes] = useState([3, 4, 5, 6, 7, 8]);
  
  // Game state
  const [horizontalLines, setHorizontalLines] = useState([]); // Array of horizontal lines
  const [verticalLines, setVerticalLines] = useState([]); // Array of vertical lines
  const [boxes, setBoxes] = useState([]); // Array of completed boxes with their owners
  
  // Initialize game
  const initializeGame = useCallback(() => {
    setHorizontalLines([]);
    setVerticalLines([]);
    setBoxes([]);
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
    setGameStatus('playing');
  }, []);

  useEffect(() => {
    initializeGame();
  }, [gridSize, initializeGame]);
  
  // Check if a box is completed
  const checkForCompletedBoxes = (newHorizontalLines, newVerticalLines) => {
    let boxesCompleted = false;
    let newBoxes = [...boxes];
    
    // Check all potential boxes
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Skip if box already completed
        if (newBoxes.some(box => box.row === row && box.col === col)) {
          continue;
        }
        
        // Check if all four sides of the box are drawn
        const topLine = newHorizontalLines.some(line => line.row === row && line.col === col);
        const bottomLine = newHorizontalLines.some(line => line.row === row + 1 && line.col === col);
        const leftLine = newVerticalLines.some(line => line.row === row && line.col === col);
        const rightLine = newVerticalLines.some(line => line.row === row && line.col === col + 1);
        
        if (topLine && bottomLine && leftLine && rightLine) {
          newBoxes.push({ row, col, owner: currentPlayer });
          boxesCompleted = true;
        }
      }
    }
    
    if (boxesCompleted) {
      setBoxes(newBoxes);
      
      // Update scores
      const player1Boxes = newBoxes.filter(box => box.owner === 1).length;
      const player2Boxes = newBoxes.filter(box => box.owner === 2).length;
      setScores({ 1: player1Boxes, 2: player2Boxes });
      
      // Check if game is finished
      const totalBoxes = gridSize * gridSize;
      if (player1Boxes + player2Boxes === totalBoxes) {
        setGameStatus('finished');
        if (player1Boxes > player2Boxes) {
          toast.success("Player 1 wins!");
        } else if (player2Boxes > player1Boxes) {
          toast.success("Player 2 wins!");
        } else {
          toast.info("It's a tie!");
        }
      }
    }
    
    return boxesCompleted;
  };
  
  // Handle line click
  const handleLineClick = (row, col, isHorizontal) => {
    // Ignore clicks if game is finished
    if (gameStatus === 'finished') return;
    
    // Check if line already exists
    if (isHorizontal) {
      if (horizontalLines.some(line => line.row === row && line.col === col)) {
        return;
      }
      
      const newHorizontalLines = [...horizontalLines, { row, col }];
      setHorizontalLines(newHorizontalLines);
      
      // Check for completed boxes
      const boxCompleted = checkForCompletedBoxes(newHorizontalLines, verticalLines);
      
      // Switch player if no boxes were completed
      if (!boxCompleted) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    } else {
      if (verticalLines.some(line => line.row === row && line.col === col)) {
        return;
      }
      
      const newVerticalLines = [...verticalLines, { row, col }];
      setVerticalLines(newVerticalLines);
      
      // Check for completed boxes
      const boxCompleted = checkForCompletedBoxes(horizontalLines, newVerticalLines);
      
      // Switch player if no boxes were completed
      if (!boxCompleted) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  };
  
  const handleSizeChange = (newSize) => {
    setGridSize(newSize);
    setShowSettings(false);
    toast.info(`Grid size changed to ${newSize}x${newSize}`);
  };
  
  // Determine winner
  const getWinner = () => {
    if (scores[1] > scores[2]) return 1;
    if (scores[2] > scores[1]) return 2;
    return 0; // Tie
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">DotNexus</h2>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label="Game settings"
              >
                <SettingsIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
              
              <button
                onClick={initializeGame}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label="Reset game"
              >
                <RefreshCwIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${currentPlayer === 1 ? 'bg-primary/10 dark:bg-primary/20' : ''}`}>
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="font-medium">Player 1: {scores[1]}</span>
            </div>
            
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${currentPlayer === 2 ? 'bg-secondary/10 dark:bg-secondary/20' : ''}`}>
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <span className="font-medium">Player 2: {scores[2]}</span>
            </div>
          </div>
          
          {/* Game board */}
          <div className="relative mx-auto"
            style={{
              width: `${(gridSize + 1) * 40}px`,
              height: `${(gridSize + 1) * 40}px`,
            }}
          >
            {/* Draw dots */}
            {Array.from({ length: gridSize + 1 }).map((_, rowIndex) => (
              Array.from({ length: gridSize + 1 }).map((_, colIndex) => (
                <div
                  key={`dot-${rowIndex}-${colIndex}`}
                  className="game-dot absolute"
                  style={{
                    top: `${rowIndex * 40}px`,
                    left: `${colIndex * 40}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                ></div>
              ))
            ))}
            
            {/* Horizontal line positions */}
            {Array.from({ length: gridSize + 1 }).map((_, rowIndex) => (
              Array.from({ length: gridSize }).map((_, colIndex) => (
                <div
                  key={`h-line-${rowIndex}-${colIndex}`}
                  className={`game-line horizontal ${
                    horizontalLines.some(line => line.row === rowIndex && line.col === colIndex) 
                      ? 'active' 
                      : ''
                  }`}
                  style={{
                    top: `${rowIndex * 40}px`,
                    left: `${colIndex * 40 + 20}px`,
                    width: '40px',
                    transform: 'translate(-50%, -50%)',
                    cursor: horizontalLines.some(line => line.row === rowIndex && line.col === colIndex) 
                      ? 'default' 
                      : 'pointer',
                  }}
                  onClick={() => handleLineClick(rowIndex, colIndex, true)}
                ></div>
              ))
            ))}
            
            {/* Vertical line positions */}
            {Array.from({ length: gridSize }).map((_, rowIndex) => (
              Array.from({ length: gridSize + 1 }).map((_, colIndex) => (
                <div
                  key={`v-line-${rowIndex}-${colIndex}`}
                  className={`game-line vertical ${
                    verticalLines.some(line => line.row === rowIndex && line.col === colIndex) 
                      ? 'active' 
                      : ''
                  }`}
                  style={{
                    top: `${rowIndex * 40 + 20}px`,
                    left: `${colIndex * 40}px`,
                    height: '40px',
                    transform: 'translate(-50%, -50%)',
                    cursor: verticalLines.some(line => line.row === rowIndex && line.col === colIndex) 
                      ? 'default' 
                      : 'pointer',
                  }}
                  onClick={() => handleLineClick(rowIndex, colIndex, false)}
                ></div>
              ))
            ))}
            
            {/* Draw completed boxes */}
            {boxes.map((box, index) => (
              <div
                key={`box-${index}`}
                className={`game-box ${box.owner === 1 ? 'player1' : 'player2'}`}
                style={{
                  top: `${box.row * 40 + 20}px`,
                  left: `${box.col * 40 + 20}px`,
                  width: '40px',
                  height: '40px',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-surface-600 dark:text-surface-400">
            {gameStatus === 'playing' ? (
              <p>Player {currentPlayer}'s turn</p>
            ) : (
              <div className="flex flex-col items-center">
                <TrophyIcon className="w-8 h-8 text-accent mb-2" />
                {getWinner() === 0 ? (
                  <p className="font-medium">It's a tie!</p>
                ) : (
                  <p className="font-medium">Player {getWinner()} wins!</p>
                )}
                <button 
                  onClick={initializeGame}
                  className="mt-3 btn-primary text-sm px-3 py-1"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Game settings modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-4 md:p-6 max-w-sm w-full"
            >
              <h3 className="text-xl font-bold mb-4">Game Settings</h3>
              
              <div className="mb-4">
                <label className="block text-surface-700 dark:text-surface-300 mb-2">
                  Grid Size: {gridSize}x{gridSize}
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        size === gridSize 
                          ? 'bg-primary text-white' 
                          : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
                      }`}
                    >
                      {size}x{size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-outline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tutorial card for first-time users */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 md:p-6 max-w-md w-full mt-4">
        <h3 className="font-bold text-lg mb-3">Quick Tutorial</h3>
        
        <div className="space-y-3 text-surface-700 dark:text-surface-300 text-sm md:text-base">
          <p>
            <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
            Player 1 uses <span className="text-primary font-medium">purple</span> lines and boxes
          </p>
          <p>
            <span className="inline-block w-3 h-3 rounded-full bg-secondary mr-2"></span>
            Player 2 uses <span className="text-secondary font-medium">pink</span> lines and boxes
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-200 dark:bg-surface-700 text-xs mr-2">?</span>
            <span>Click between dots to draw lines. Complete a box to earn a point and an extra turn!</span>
          </p>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-xs text-surface-500 dark:text-surface-400">
          <p>Adjust grid size in settings</p>
          <p>First to claim the most boxes wins!</p>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;