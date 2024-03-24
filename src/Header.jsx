export default function Header({ currentScore, highScore }) {
  return (
    <section className="header">
      <h1>MEMORY CARD: President's Edition</h1>
      <div className="scores">
        <p>Current Score: {currentScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </section>
  );
}
