import { useState } from 'react';
import { data } from '../data.js';
import { shuffle } from '../shuffle.js';
import Header from './Header.jsx';

function fetchNewDeck() {
  let deck = shuffle(data).slice(0, 10);
  return deck;
}

export default function Board() {
  const [currentDeck, setCurrentDeck] = useState(fetchNewDeck());
  const [usedCards, setUsedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState(null);

  const handleCardClick = (e) => {
    const cardId = e.target.id;

    if (usedCards.includes(cardId)) {
      setMessage('Keep trying.');
      // resetGame();
    } else if (currentScore + 1 != currentDeck.length) {
      setCurrentScore(currentScore + 1);
      setUsedCards([...usedCards, cardId]);
      checkHighScore();
      const newDeal = shuffle(currentDeck);
      setCurrentDeck(newDeal);
    } else {
      setCurrentScore(currentScore + 1);
      checkHighScore();
      setMessage('Congratulations!');
    }
  };

  function checkHighScore() {
    if (currentScore + 1 > highScore) {
      setHighScore(currentScore + 1);
    }
  }

  function resetGame() {
    setCurrentDeck(fetchNewDeck());
    setUsedCards([]);
    setCurrentScore(0);
    setMessage(null);
  }

  return (
    <div className="main-wrapper">
      <Header highScore={highScore} currentScore={currentScore} />

      {!message && (
        <>
          <p className="directions">
            <i>
              Get points by clicking on an image but don't click any image more
              than once!
            </i>
          </p>
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
        </>
      )}
      {message && (
        <section className="message-container">
          <div className="message">
            <h1>
              You got {currentScore} out of {currentDeck.length}
            </h1>
            <h1>{message}</h1>
            <button className="reset-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
