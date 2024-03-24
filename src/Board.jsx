import { useState, useRef, useEffect } from 'react';
import { shuffle } from './shuffle.js';
import Header from './Header.jsx';

export default function Board() {
  const effectRef = useRef(false);
  const [difficulty, setDifficulty] = useState(false);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [usedCards, setUsedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!effectRef.current && !difficulty) {
      console.log('getting deck');
      const fetchPresidents = async () => {
        const response = await fetch('src/data.json');
        const data = await response.json();
        setCurrentDeck(shuffle(data));
      };
      fetchPresidents();
    }
    return () => {
      effectRef.current = true;
    };
  }, [difficulty]);

  const handleCardClick = (e) => {
    const cardId = e.target.id;
    setCurrentScore(currentScore + 1);

    if (usedCards.includes(cardId)) {
      setCurrentScore(0);
      setUsedCards([]);
      setCurrentDeck([...currentDeck]);
      setGameOver(true);
      console.log('game over');
    } else if (currentScore + 1 === currentDeck.length) {
      setHighScore(currentScore + 1);
      setCurrentScore(0);
      setUsedCards([]);
      setCurrentDeck([]);
      setDifficulty(false);
      setGameOver(false);
      effectRef.current = false;
      console.log('you won');
    } else {
      setUsedCards([...usedCards, cardId]);
      currentScore + 1 > highScore
        ? setHighScore(currentScore + 1)
        : setHighScore(highScore);
      const newDeal = shuffle(currentDeck);
      setCurrentDeck([...newDeal]);
    }
  };

  const handleDifficultyClick = (e) => {
    const level = Number(e.target.value);
    const data = currentDeck.reverse().slice(0, level);
    setCurrentDeck(data);
    setDifficulty(true);
  };

  return (
    <div className="main-wrapper">
      <Header currentScore={currentScore} highScore={highScore} />

      {difficulty ? (
        <section className="board">
          {currentDeck.map((card, index) => (
            <div className="card-container" key={index}>
              <img
                className="card-image"
                id={card.id}
                alt={card.name}
                src={card.photo}
                onClick={handleCardClick}
              />
              <p className="card-text">{card.name}</p>
            </div>
          ))}
        </section>
      ) : (
        <section>
          Choose level
          <button value="5" onClick={handleDifficultyClick}>
            EASY
          </button>
          <button value="10" onClick={handleDifficultyClick}>
            MEDIUM
          </button>
          <button value="25" onClick={handleDifficultyClick}>
            HARD
          </button>
          <button value="45" onClick={handleDifficultyClick}>
            EXPERT
          </button>
        </section>
      )}
    </div>
  );
}
